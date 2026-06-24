"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { analyzeBeauty, recommendSalonsForAnalysis } from "@/lib/ai-beauty-analysis";
import type { AIAnalysisResult, AILookRecommendation, Salon } from "@/lib/types";
import { SALONS } from "@/lib/salons";
import { formatPrice } from "@/lib/salons";

// ─── Step type ───────────────────────────────────────────────────────────────
type Step = "welcome" | "uploading" | "analyzing" | "results" | "salons";

// ─── Analysis Result Card ─────────────────────────────────────────────────────
function AnalysisCard({
  label,
  value,
  subValue,
  color,
  icon,
}: {
  label: string;
  value: string;
  subValue?: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="glass-light rounded-2xl p-4 flex items-center gap-4 transition-all hover:border-blush/20">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted uppercase tracking-wider">{label}</p>
        <p className="font-display text-lg font-semibold text-foreground">{value}</p>
        {subValue && <p className="text-xs text-muted mt-0.5">{subValue}</p>}
      </div>
    </div>
  );
}

// ─── Recommendation Card ──────────────────────────────────────────────────────
function RecCard({ rec }: { rec: AILookRecommendation }) {
  const catColors: Record<string, string> = {
    hairstyle: "from-emerald/20 to-emerald/5 border-emerald/20",
    makeup: "from-blush/20 to-blush/5 border-blush/20",
    "hair-color": "from-gold/20 to-gold/5 border-gold/20",
    grooming: "from-violet/20 to-violet/5 border-violet/20",
  };
  const catIcons: Record<string, string> = {
    hairstyle: "💇",
    makeup: "💄",
    "hair-color": "🎨",
    grooming: "✨",
  };

  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${catColors[rec.category] ?? "from-surface-2 to-surface-3 border-border"} p-5 transition-all hover:-translate-y-0.5`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{catIcons[rec.category] ?? "✨"}</span>
          <div>
            <p className="text-xs text-muted capitalize">{rec.category.replace("-", " ")}</p>
            <p className="font-display text-sm font-semibold text-foreground">{rec.confidence}% match</p>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
          rec.difficulty === "easy" ? "bg-emerald/20 text-emerald" :
          rec.difficulty === "expert" ? "bg-violet/20 text-violet" :
          "bg-gold/20 text-gold"
        }`}>
          {rec.difficulty}
        </span>
      </div>
      <h4 className="font-display text-base font-semibold text-foreground mb-2">{rec.title}</h4>
      <p className="text-sm text-muted leading-relaxed mb-4">{rec.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {rec.occasion.map((occ) => (
          <span key={occ} className="rounded-full bg-surface/60 px-2 py-0.5 text-[10px] text-muted capitalize">
            {occ.replace("-", " ")}
          </span>
        ))}
      </div>
      <div className="pt-3 border-t border-border/50 flex items-center justify-between">
        <span className="text-xs text-muted">Est. {rec.estimatedPrice}</span>
        <span className="text-xs text-muted">{rec.salonServices.slice(0, 2).join(", ")}</span>
      </div>
    </div>
  );
}

// ─── Salons Section ───────────────────────────────────────────────────────────
function SalonsSection({ recs }: { recs: AILookRecommendation[] }) {
  const matched = recommendSalonsForAnalysis(recs, SALONS).slice(0, 6);

  return (
    <div className="mt-10">
      <h3 className="font-display text-xl font-bold text-foreground mb-1">
        Salons matching your look
      </h3>
      <p className="text-sm text-muted mb-6">
        Curated based on your AI analysis — book directly from here.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matched.map((salon, i) => (
          <Link
            key={salon.id}
            href={`/salon/${salon.id}`}
            className="glass-light rounded-2xl overflow-hidden border border-border group transition-all hover:border-blush/30"
          >
            {salon.image && (
              <div className="relative h-32 overflow-hidden bg-surface-2">
                <Image
                  src={salon.image}
                  alt={salon.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-display text-sm font-semibold text-foreground group-hover:text-blush transition-colors">
                  {salon.name}
                </h4>
                <span className="shrink-0 rounded-full bg-gold-soft px-2 py-0.5 text-xs font-semibold text-gold">
                  ★ {salon.rating}
                </span>
              </div>
              <p className="text-xs text-muted mb-3">{salon.area}</p>
              <div className="flex flex-wrap gap-1">
                {salon.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full bg-blush-soft px-2 py-0.5 text-[10px] text-blush">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted">
                  From {formatPrice(Math.min(...(SALONS.find(s => s.id === salon.id)?.services.map(s => s.price) ?? [1000])))}
                </span>
                <span className="text-xs font-semibold text-blush group-hover:underline">
                  Book now →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BeautyAnalysisPage() {
  const [step, setStep] = useState<Step>("welcome");
  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create data URL for image
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setImageDataUrl(dataUrl);
      setStep("uploading");

      try {
        // Simulate upload delay
        await new Promise((r) => setTimeout(r, 1000));
        setStep("analyzing");
        const analysisResult = await analyzeBeauty(dataUrl);
        setResult(analysisResult);
        setStep("results");
      } catch {
        setError("Analysis failed. Please try again with a clearer selfie.");
        setStep("welcome");
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDemo = useCallback(async () => {
    setStep("uploading");
    setImageDataUrl("demo-selfie");
    await new Promise((r) => setTimeout(r, 1000));
    setStep("analyzing");
    try {
      const analysisResult = await analyzeBeauty("demo-selfie");
      setResult(analysisResult);
      setStep("results");
    } catch {
      setError("Demo analysis failed. Please try again.");
      setStep("welcome");
    }
  }, []);

  const reset = () => {
    setStep("welcome");
    setImageDataUrl("");
    setResult(null);
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-soft border border-blush-soft px-4 py-1.5 text-xs font-semibold text-blush mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blush opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blush" />
            </span>
            AI-Powered · Free · 30 Seconds
          </span>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            AI Beauty{" "}
            <span className="gradient-text">Analysis</span>
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-muted">
            Upload a selfie and get personalized face shape, skin tone, hair type insights — plus
            look and salon recommendations tailored to you.
          </p>
        </div>

        {/* ── Welcome Step ──────────────────────────────────────────────────── */}
        {step === "welcome" && (
          <div className="anim-fade-up">
            <div className="glass-card rounded-3xl p-8 sm:p-12">
              {/* Upload Zone */}
              <div className="text-center">
                <div
                  className="relative mx-auto mb-8 flex h-56 w-full max-w-sm cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-blush/30 bg-blush-soft/20 transition-all hover:border-blush/60 hover:bg-blush-soft/30"
                  onClick={() => fileRef.current?.click()}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="text-5xl mb-4">📸</div>
                    <p className="font-display text-base font-semibold text-foreground">
                      Tap to upload your selfie
                    </p>
                    <p className="mt-2 text-sm text-muted max-w-xs mx-auto">
                      Use a clear, well-lit photo facing the camera. No glasses or hats for best results.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <button
                  type="button"
                  onClick={handleDemo}
                  className="rounded-2xl bg-gradient-to-r from-violet/80 to-blush/60 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                >
                  ✨ Try with Demo Analysis
                </button>

                {error && (
                  <p className="mt-4 text-sm text-rose-400">{error}</p>
                )}
              </div>

              {/* Feature benefits */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: "🧠", title: "AI Face Analysis", desc: "Face shape, features & proportions detected" },
                  { icon: "🎨", title: "Color Science", desc: "Skin tone & undertone identified with hex values" },
                  { icon: "💡", title: "Smart Recommendations", desc: "Hairstyles, makeup & colors matched to you" },
                ].map((item) => (
                  <div key={item.title} className="glass-light rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <p className="font-display text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs text-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Uploading Step ────────────────────────────────────────────────── */}
        {step === "uploading" && (
          <div className="anim-fade-up glass-card rounded-3xl p-12 text-center">
            <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-blush-soft flex items-center justify-center">
              <div className="text-5xl animate-bounce">📤</div>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Uploading your selfie...</h2>
            <p className="mt-3 text-muted">Secure upload · Your photo is only used for analysis</p>
            <div className="mt-8 h-1.5 w-64 mx-auto rounded-full bg-surface-3 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-blush to-rose-gold animate-shimmer" style={{ width: "70%" }} />
            </div>
          </div>
        )}

        {/* ── Analyzing Step ────────────────────────────────────────────────── */}
        {step === "analyzing" && (
          <div className="anim-fade-up glass-card rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blush to-transparent opacity-60 anim-scan-line" />
            </div>

            <div className="relative">
              <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-blush to-rose-gold flex items-center justify-center shadow-2xl shadow-blush/20">
                <div className="text-5xl anim-analysis-pulse">🔬</div>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">AI Analysis in Progress...</h2>
              <p className="mt-3 text-muted">Our AI is analyzing your facial features, skin & hair</p>

              {/* Analysis stages */}
              <div className="mt-10 max-w-sm mx-auto space-y-4">
                {[
                  { label: "Detecting face shape...", icon: "🧠", delay: 0 },
                  { label: "Analyzing skin tone...", icon: "🎨", delay: 400 },
                  { label: "Identifying hair type...", icon: "💇", delay: 800 },
                  { label: "Generating recommendations...", icon: "✨", delay: 1200 },
                ].map((stage, i) => (
                  <div
                    key={stage.label}
                    className="flex items-center gap-3 rounded-xl bg-surface-2/50 px-4 py-3 text-left"
                    style={{ animationDelay: `${stage.delay}ms` }}
                  >
                    <div className="text-xl">{stage.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">{stage.label}</p>
                      <div className="mt-1 h-0.5 rounded-full bg-surface-3 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blush to-rose-gold anim-shimmer"
                          style={{ width: `${30 + i * 20}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Results Step ──────────────────────────────────────────────────── */}
        {step === "results" && result && (
          <div className="anim-fade-up space-y-8">
            {/* Success banner */}
            <div className="glass-light rounded-2xl border border-emerald/20 p-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald/20 text-xl">
                ✅
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Analysis complete!</p>
                <p className="text-xs text-muted">Personalized recommendations ready for you</p>
              </div>
              <button
                type="button"
                onClick={reset}
                className="ml-auto rounded-xl border border-border px-3 py-1.5 text-xs text-muted hover:border-blush hover:text-blush transition"
              >
                ↻ New Analysis
              </button>
            </div>

            {/* Analysis cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnalysisCard
                label="Face Shape"
                value={result.analysis.faceShape.charAt(0).toUpperCase() + result.analysis.faceShape.slice(1)}
                subValue={`${result.analysis.faceShapeConfidence}% confidence`}
                color="rgba(232,121,249,0.2)"
                icon="🧠"
              />
              <AnalysisCard
                label="Skin Tone"
                value={result.analysis.skinTone.charAt(0).toUpperCase() + result.analysis.skinTone.slice(1)}
                subValue={`Undertone: ${result.analysis.undertone} · ${result.analysis.skinType} skin`}
                color={result.analysis.skinToneHex + "40"}
                icon="🎨"
              />
              <AnalysisCard
                label="Hair Type"
                value={result.analysis.hairType.charAt(0).toUpperCase() + result.analysis.hairType.slice(1)}
                subValue={`${result.analysis.hairTexture} texture · ${result.analysis.hairCondition} condition`}
                color="rgba(245,158,11,0.2)"
                icon="💇"
              />
            </div>

            {/* Face shape reasoning */}
            <div className="glass-light rounded-2xl border border-border p-6">
              <h3 className="font-display text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <span>🧠</span> Face Shape Analysis
              </h3>
              <p className="text-sm text-muted leading-relaxed">{result.analysis.faceShapeReasoning}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.analysis.keyFeatures.map((f) => (
                  <span key={f} className="rounded-full bg-blush-soft px-3 py-1 text-xs text-blush">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Look Recommendations */}
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                Your Personalized Look Recommendations
              </h3>
              <p className="text-sm text-muted mb-6">
                Based on your unique profile — AI-generated just for you
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {result.lookRecommendations.map((rec) => (
                  <RecCard key={rec.id} rec={rec} />
                ))}
              </div>
            </div>

            {/* Salon recommendations */}
            <SalonsSection recs={result.lookRecommendations} />

            {/* Action buttons */}
            <div className="glass-light rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-display text-base font-semibold text-foreground">Ready to book?</p>
                <p className="text-sm text-muted">Find salons that match your AI recommendations</p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/budget-optimizer"
                  className="rounded-xl border border-gold-soft bg-gold-soft px-5 py-2.5 text-sm font-semibold text-gold transition-all hover:bg-gold/20"
                >
                  💰 Budget Optimizer
                </Link>
                <Link
                  href="/#salons"
                  className="rounded-xl bg-gradient-to-r from-blush to-rose-gold px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
                >
                  💅 Browse Salons
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}