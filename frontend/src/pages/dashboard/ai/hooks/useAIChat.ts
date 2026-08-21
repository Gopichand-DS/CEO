import { useMutation } from "@tanstack/react-query";

import { sendAIMessage } from "../api/aiApi";

export const useAIChat = () => {
  return useMutation({
    mutationFn: sendAIMessage,
  });
};