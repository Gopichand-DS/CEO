export interface AIChatRequest {
  message: string;
  company_id: number;
}
export interface AIProvider {
  provider: string;
  model: string;
}

export interface AIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface AIChatResponse {
  content: string;
  provider: {
    provider: string;
    model: string;
  };
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  finish_reason: string;
  latency_ms: number;
  success: boolean;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}