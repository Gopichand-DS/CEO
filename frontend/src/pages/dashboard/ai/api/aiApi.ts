import api from "@/lib/axios";

import type {
  AIChatRequest,
  AIChatResponse,
} from "../types/ai";

export const sendAIMessage = async (
  data: AIChatRequest,
): Promise<AIChatResponse> => {
  const response = await api.post<AIChatResponse>(
    "/ai/chat",
    data,
  );

  return response.data;
};