export type ConsultantMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AIRecommendation = {
  salonId: string;
  salonName: string;
  serviceId: string;
  serviceName: string;
  reason: string;
};

export type AIConsultantResponse = {
  reply: string;
  recommendations: AIRecommendation[];
  provider: "groq" | "gemini" | "openai" | "fallback";
};
