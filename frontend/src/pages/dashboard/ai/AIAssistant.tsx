import {
  Bot,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import type { FormEvent } from "react";
import {
  useState,
} from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAIChat } from "./hooks/useAIChat";

import type {
  AIMessage,
} from "./types/ai";

const initialMessage: AIMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello. I'm your Executive AI Advisor. Ask me about company performance, revenue, employees, projects, tasks, or operational issues.",
  createdAt: new Date().toISOString(),
};

const AIAssistant = () => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    AIMessage[]
  >([initialMessage]);
  
  const user = useAuthStore((state) => state.user);

  const {
    mutateAsync,
    isPending,
  } = useAIChat();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isPending) {
      return;
    }

    const userMessage: AIMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setMessage("");

    try {
      if (!user?.company_id) {
          throw new Error("Authenticated company information is unavailable.");
      }

      const result = await mutateAsync({
        message: trimmedMessage,
        company_id: user.company_id,
      });

      const assistantMessage: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.content,
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(
        "AI Assistant error:",
        error,
      );

      const errorMessage: AIMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "I couldn't process that request right now. Please try again.",
        createdAt: new Date().toISOString(),
      };

      setMessages((current) => [
        ...current,
        errorMessage,
      ]);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-col rounded-2xl border bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-4 border-b p-6">

        <div className="rounded-xl bg-violet-100 p-3">
          <Sparkles
            size={24}
            className="text-violet-600"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Executive AI Assistant
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Ask questions about your company and
            investigate business performance.
          </p>
        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 space-y-6 overflow-y-auto p-6">

        {messages.map((item) => (
          <div
            key={item.id}
            className={`flex gap-3 ${
              item.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {item.role === "assistant" && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100">
                <Bot
                  size={18}
                  className="text-violet-600"
                />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                item.role === "user"
                  ? "rounded-br-md bg-blue-600 text-white"
                  : "rounded-bl-md bg-slate-100 text-slate-800"
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-7">
                {item.content}
              </p>
            </div>

            {item.role === "user" && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <User
                  size={18}
                  className="text-blue-600"
                />
              </div>
            )}

          </div>
        ))}

        {isPending && (
          <div className="flex gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100">
              <Bot
                size={18}
                className="text-violet-600"
              />
            </div>

            <div className="rounded-2xl rounded-bl-md bg-slate-100 px-5 py-3">
              <p className="text-sm text-slate-500">
                Analyzing your request...
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Input */}

      <form
        onSubmit={handleSubmit}
        className="border-t p-5"
      >
        <div className="flex items-center gap-3 rounded-xl border bg-slate-50 p-2">

          <input
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            placeholder="Ask your Executive AI..."
            disabled={isPending}
            className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={
              isPending ||
              message.trim().length === 0
            }
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>

        </div>

        <p className="mt-2 px-2 text-xs text-slate-400">
          AI responses are based on the company's
          available business data.
        </p>
      </form>

    </div>
  );
};

export default AIAssistant;