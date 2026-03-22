"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_STARTS = [
  { label: "What should I focus on today?", icon: "✦" },
  { label: "Which children need attention?", icon: "⚑" },
  { label: "Suggest an activity for SED", icon: "◈" },
  { label: "Help me write an observation", icon: "✎" },
];

const DEMO_REPLIES: Record<string, string> = {
  "What should I focus on today?":
    "Based on this week's coverage, Numeracy is the least observed domain. 3 children — Aiden, Priya, and Marcus — haven't had a NUM session since Monday. Consider running a counting or sorting activity this afternoon.",
  "Which children need attention?":
    "Aiden Lim has missed 2 days this week and has an unread parent message. Priya Nair is at risk of falling behind in Language & Literacy — her last LL session was 8 days ago. I'd suggest checking in with both today.",
  "Suggest an activity for SED":
    "Try 'Feelings Charades' — children take turns acting out an emotion while classmates guess. It hits SED milestone S2 (identifies and names emotions) and works well for the whole class. Aim for 15–20 minutes before lunch.",
  "Help me write an observation":
    "Sure! Tell me the child's name and what you observed, and I'll draft it in the NEL format for you.",
};

export function AIAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your Nurture assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    // Scroll only the thread container — scrollIntoView can scroll <main> / the
    // document and hide fixed headers or distort the dashboard flex layout.
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const reply =
      DEMO_REPLIES[text.trim()] ??
      "I'm still learning — this feature will be fully available soon. In the meantime, try one of the quick-start prompts below.";
    const assistantMsg: Message = { role: "assistant", content: reply };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <span className="flex size-6 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">
          AI
        </span>
        <span className="text-sm font-semibold text-foreground">Assistant</span>
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          Beta
        </span>
      </div>

      {/* Message thread */}
      <div
        ref={messagesRef}
        className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted text-foreground rounded-bl-sm"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* Quick-start chips */}
      <div className="px-3 pb-2">
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          Quick start
        </p>
        <div className="flex flex-col gap-1.5">
          {QUICK_STARTS.map((q) => (
            <button
              key={q.label}
              onClick={() => send(q.label)}
              className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:bg-muted/70 active:scale-[0.98]"
            >
              <span className="shrink-0 text-primary">{q.icon}</span>
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t px-3 py-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask anything…"
            rows={1}
            className="flex-1 resize-none rounded-xl border bg-muted/40 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
