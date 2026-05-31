import { NextRequest, NextResponse } from "next/server";
import type { AIConsultantResponse, ConsultantMessage } from "@/lib/ai-consultant-types";
import { AI_CONSULTANT_SYSTEM_PROMPT, getSalonCatalogForAI } from "@/lib/salon-catalog";
import { buildConsultantFallback } from "@/lib/ai-recommend";
import { SALONS } from "@/lib/salons";

export const runtime = "nodejs";

function buildSystemContent(): string {
  return `${AI_CONSULTANT_SYSTEM_PROMPT}\n\nCATALOG:\n${getSalonCatalogForAI()}`;
}

function parseModelJson(raw: string): Omit<AIConsultantResponse, "provider"> {
  const trimmed = raw.trim();
  const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
  const jsonStr = jsonMatch ? jsonMatch[0] : trimmed;
  const parsed = JSON.parse(jsonStr) as {
    reply?: string;
    recommendations?: AIConsultantResponse["recommendations"];
  };
  const recommendations = (parsed.recommendations ?? []).filter(
    (r) =>
      r.salonId &&
      r.serviceId &&
      SALONS.some((s) => s.id === r.salonId && s.services.some((svc) => svc.id === r.serviceId))
  );
  return {
    reply: parsed.reply ?? "I'd love to help you find the perfect salon in Mumbai!",
    recommendations,
  };
}

async function callGroq(messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
      messages,
      temperature: 0.6,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.choices[0].message.content as string;
}

async function callGemini(messages: { role: string; content: string }[]): Promise<string> {
  const key = process.env.GEMINI_API_KEY!;
  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: messages.find((m) => m.role === "system")!.content }] },
      contents,
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 1024,
        responseMimeType: "application/json",
      },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.candidates[0].content.parts[0].text as string;
}

async function callOpenAI(messages: { role: string; content: string }[]): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages,
      temperature: 0.6,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI: ${res.status} ${err}`);
  }
  const data = await res.json();
  return data.choices[0].message.content as string;
}

function fallbackResponse(userQuery: string): AIConsultantResponse {
  return buildConsultantFallback(userQuery, SALONS);
}

export async function POST(req: NextRequest) {
  let lastUserContent = "";
  try {
    const body = (await req.json()) as { messages?: ConsultantMessage[] };
    const history = body.messages ?? [];
    const lastUser = [...history].reverse().find((m) => m.role === "user");
    lastUserContent = lastUser?.content?.trim() ?? "";
    if (!lastUserContent) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const apiMessages = [
      { role: "system", content: buildSystemContent() },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ];

    let provider: AIConsultantResponse["provider"] = "fallback";
    let raw = "";

    if (process.env.GROQ_API_KEY) {
      provider = "groq";
      raw = await callGroq(apiMessages);
    } else if (process.env.GEMINI_API_KEY) {
      provider = "gemini";
      raw = await callGemini(apiMessages);
    } else if (process.env.OPENAI_API_KEY) {
      provider = "openai";
      raw = await callOpenAI(apiMessages);
    } else {
      return NextResponse.json(fallbackResponse(lastUserContent));
    }

    const parsed = parseModelJson(raw);
    return NextResponse.json({ ...parsed, provider } satisfies AIConsultantResponse);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI consultant error";
    console.error("[ai-consultant]", msg);
    if (lastUserContent) {
      return NextResponse.json(fallbackResponse(lastUserContent));
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
