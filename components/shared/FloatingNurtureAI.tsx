"use client";

import { useReducedMotion, motion } from "framer-motion";
import {
  BookOpen,
  BookUser,
  Cable,
  ChevronDown,
  ClipboardPen,
  Globe,
  LayoutGrid,
  Library,
  Minus,
  Paperclip,
  Plus,
  Puzzle,
  Send,
  SlidersHorizontal,
  Sparkles,
  SquarePen,
  FileText,
  ArrowUp,
  TrendingUp,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/** Floating AI is teacher-demo only (not child / parent / admin / marketing). */
function isTeacherExperiencePath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/demo/teacher") return true;
  if (pathname === "/teacher") return true;
  return pathname.startsWith("/teacher/");
}

const SUGGESTIONS = [
  { label: "Plan a lesson", Icon: BookOpen },
  { label: "Check student's progress", Icon: TrendingUp },
  { label: "Send progress report", Icon: Send },
  { label: "Log an observation", Icon: ClipboardPen },
] as const;

const QUICK_MOCK_REPLIES: Record<string, string> = {
  "Plan a lesson":
    "Here’s a **K2 Language & Literacy** idea for tomorrow (demo):\n\n**Title:** Story sequence cards\n**Goal:** Children retell a familiar story in order (NEL: listening & speaking).\n**Flow (25 min):** Read *The Very Hungry Caterpillar*, then hand out 4 picture cards and have pairs arrange them. Circulate and note who needs support with “first / next / last.”\n\nShould I create the materials? Or would you like to generate another plan?",
  "Check student's progress":
    "**Class snapshot (mock data)**\n\n• **Aiden Lim** — LL: Developing (last activity Tue). NUM: on track. SED: 4/5 observations this week.\n• **Priya Nair** — LL: needs a fresh session (8+ days). NUM: Secure. Attendance: 100%.\n• **Marcus Tan** — Strong in NUM; consider a stretch grouping for patterning.\n\nOpen a child profile in Nurture for full milestone detail.",
  "Send progress report":
    "**Draft parent update (demo)**\n\nHi Priya’s parents,\n\nThis week Priya joined small-group storytelling and volunteered a prediction for what happens next. In numeracy she’s confidently matching quantities to numerals 1–10. We’ll keep building stamina for writing her name.\n\nWarmly,\n[Your name]\n\n— *You’d pick a child and tone; this is illustrative only.*",
  "Log an observation":
    "**Observation scaffold (demo)**\n\n**Child:** [name]\n**Context:** free play / small group / outdoor\n**NEL area:** LL / NUM / SED\n**What you saw:** (1–2 sentences, objective)\n**What it suggests:** Beginning / Developing / Secure for milestone ___\n\nPaste your notes here next time and I’ll help polish the wording for your log.",
};

const DEFAULT_FREE_TEXT_REPLY =
  "Thanks for that — **full AI replies aren’t wired up yet**, but your message was received. Try a quick action above or ask about lessons, progress, reports, or observations.";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** When set on the latest assistant turn, show tap-to-reply chips below the thread. */
  chipContextKey?: string;
};

type ChipDefinition = {
  label: string;
  userMessage: string;
  assistantReply: string;
  nextChipContextKey?: string;
};

/** Contextual one-tap replies after each assistant “flow” (demo). */
const CHIP_SETS: Record<string, ChipDefinition[]> = {
  plan_lesson: [
    {
      label: "Create the materials",
      userMessage: "Create the materials",
      assistantReply:
        "**Materials (demo):** I’ve staged **4 story-sequence panels** (The Very Hungry Caterpillar), a **pairing mat**, and a **1-page teacher script** with key questions. In the real product you’d export to PDF or push to your class board.\n\nWant to **swap the book** or **shorten the block**?",
      nextChipContextKey: "plan_lesson_after_materials",
    },
    {
      label: "Generate another plan",
      userMessage: "Generate another plan",
      assistantReply:
        "**Alternate LL plan (demo):** **Title:** Sound bag mystery\n**Goal:** Initial phonological awareness — same onset sound.\n**Flow (20 min):** Mystery bag with 5 objects; children name them, then sort by starting sound in two hoops.\n\nShould I create the materials? Or would you like to generate another plan?",
      nextChipContextKey: "plan_lesson",
    },
    {
      label: "Try numeracy instead",
      userMessage: "Try a numeracy lesson instead",
      assistantReply:
        "**K2 Numeracy idea (demo):** **Title:** Train-car counting\n**Goal:** Stable order to 10 + 1:1 correspondence.\n**Flow (25 min):** Paper “train” with 10 cars; roll a die, add that many stickers, compare with a partner.\n\nShould I create the materials? Or would you like to generate another plan?",
      nextChipContextKey: "plan_lesson",
    },
  ],
  plan_lesson_after_materials: [
    {
      label: "Swap the book",
      userMessage: "Use a different book",
      assistantReply:
        "**Swap (demo):** Pick a **familiar class read** with a clear sequence (e.g. *The Three Little Pigs*). I’ll remap the same 4-card retell structure — say which title you prefer in your next message.",
    },
    {
      label: "Shorten to 15 minutes",
      userMessage: "Shorten to 15 minutes",
      assistantReply:
        "**15-minute version (demo):** Whole-group read (6 min) → **2 cards only** (beginning / end) with choral retell → quick pair sort with **3** panels instead of 4. Drop the written extension.",
    },
  ],
  progress_snapshot: [
    {
      label: "Open Aiden’s profile",
      userMessage: "Open Aiden’s profile",
      assistantReply:
        "**Aiden Lim (demo drill-down):** **LL** — last guided reading Tue; next step: sentence-level retell. **NUM** — Secure on 1–10; try teen numbers next. **SED** — cooperative play strong; note sharing during blocks yesterday.\n\nWant a **suggested activity** or **parent line** for him?",
      nextChipContextKey: "progress_followup",
    },
    {
      label: "Nudge Priya on LL",
      userMessage: "Draft a nudge for Priya’s LL",
      assistantReply:
        "**Priya — LL nudge (demo):** Plan a **10-min 1:1** or **pair** slot tomorrow: picture walk + “what happens next?” with a **word bank** of 4 verbs. Log one **Developing** observation if she orders 2+ events.\n\nShould I **slot it on the timetable** or **draft a parent heads-up**?",
      nextChipContextKey: "progress_followup",
    },
    {
      label: "Stretch Marcus in NUM",
      userMessage: "Suggest a stretch for Marcus in numeracy",
      assistantReply:
        "**Marcus — NUM stretch (demo):** Offer **pattern strips** (AB / AAB) with manipulatives, or a **“mystery number”** clue game with a number line to 20. He’s ready for **justifying** why a pattern repeats.",
      nextChipContextKey: "progress_followup",
    },
  ],
  progress_followup: [
    {
      label: "Suggest an activity",
      userMessage: "Suggest a follow-up activity",
      assistantReply:
        "**Activity idea (demo):** Try a **10-minute station rotation** — one teacher-led, one independent — so you can **tag 2 observations** before lunch. I can tailor by domain in your next message.",
    },
    {
      label: "Draft a parent line",
      userMessage: "Draft a parent update line",
      assistantReply:
        "**Parent line (demo):** *“We’re reinforcing story order in class — ask [child] to tell you what happened first and last in a book at bedtime.”*",
    },
  ],
  report_draft: [
    {
      label: "Copy email (demo)",
      userMessage: "Copy this email draft",
      assistantReply:
        "**Copied (demo):** In a real build this would land on your clipboard. For now, select the draft above and copy manually — formatting is preserved in Nurture exports.",
    },
    {
      label: "Warmer tone",
      userMessage: "Make the tone warmer",
      assistantReply:
        "**Warmer draft (demo):** Hi Priya’s parents,\n\nWe’ve had such a lovely week with Priya — she lit up during storytelling and had thoughtful guesses for what comes next. In numeracy she’s growing so confident matching numbers to quantities up to 10. We’re gently practising writing her name and celebrating every try.\n\nWith appreciation,\n[Your name]",
      nextChipContextKey: "report_draft",
    },
    {
      label: "Different child",
      userMessage: "Draft for a different child",
      assistantReply:
        "**Switch child (demo):** Say a **name** and **one win + one focus** in your next message (e.g. “Marcus — patterns strong, SED turn-taking”). I’ll mirror the same parent-email structure.",
    },
  ],
  observation_scaffold: [
    {
      label: "SED template",
      userMessage: "Walk me through SED wording",
      assistantReply:
        "**SED observation (demo):** *During outdoor play, Priya invited a peer to join the sand kitchen and negotiated roles (“You pour, I’ll stir”).* → Links to **cooperation** / **peer interaction**; tag **Developing** if inconsistent across contexts.",
    },
    {
      label: "NEL-style polish",
      userMessage: "Polish with NEL-style language",
      assistantReply:
        "**NEL polish (demo):** *Child demonstrates emerging ability to **negotiate roles** in cooperative play and **respond positively** to peers’ ideas (SED). Next step: note whether this appears **across** free play and structured groups.*",
    },
    {
      label: "I’ll paste notes next",
      userMessage: "I’ll paste rough notes in my next message",
      assistantReply:
        "**Ready (demo):** Paste your **raw bullet notes** next — include **child**, **where/when**, and **what you saw**. I’ll suggest a **clean log line** and a **milestone tag** you can drop into Nurture.",
    },
  ],
  add_context: [
    {
      label: "Describe an attachment",
      userMessage: "I’ll describe what I’d attach",
      assistantReply:
        "**Got it (demo):** In one message, note **file type** (photo of work / PDF / link) and **what you want me to do** (summarise, align to NEL, draft parent text). Attachments will open inline when the feature ships.",
    },
    {
      label: "Skip for now",
      userMessage: "Skip adding context",
      assistantReply:
        "**No problem (demo):** We’ll continue from the **Nurture** context chip. Ask anything in the box below or pick a fresh goal (lesson, progress, report, observation).",
      nextChipContextKey: "default_followup",
    },
  ],
  settings_help: [
    {
      label: "Keep Auto",
      userMessage: "Keep Auto",
      assistantReply:
        "**Auto (demo):** Stays on — balanced length, classroom-safe tone, and **NEL-aware** suggestions. You can switch later to **Concise** or **Coach** modes when those ship.",
    },
    {
      label: "What can I customise?",
      userMessage: "What can I customise later?",
      assistantReply:
        "**Roadmap (demo):** **Tone** (warm ↔ formal), **length**, **default domain** (LL / NUM / SED), **language** (e.g. English with simple parent Chinese), and **school templates** for reports and observations.",
      nextChipContextKey: "default_followup",
    },
  ],
  default_followup: [
    {
      label: "Plan a lesson",
      userMessage: "Plan a lesson",
      assistantReply: QUICK_MOCK_REPLIES["Plan a lesson"],
      nextChipContextKey: "plan_lesson",
    },
    {
      label: "Check class progress",
      userMessage: "Check student's progress",
      assistantReply: QUICK_MOCK_REPLIES["Check student's progress"],
      nextChipContextKey: "progress_snapshot",
    },
    {
      label: "Send a parent update",
      userMessage: "Send progress report",
      assistantReply: QUICK_MOCK_REPLIES["Send progress report"],
      nextChipContextKey: "report_draft",
    },
    {
      label: "Log an observation",
      userMessage: "Log an observation",
      assistantReply: QUICK_MOCK_REPLIES["Log an observation"],
      nextChipContextKey: "observation_scaffold",
    },
  ],
};

const QUICK_ACTION_CHIP_KEY: Record<string, string> = {
  "Plan a lesson": "plan_lesson",
  "Check student's progress": "progress_snapshot",
  "Send progress report": "report_draft",
  "Log an observation": "observation_scaffold",
};

function resolveAssistantTurn(text: string): {
  assistantText: string;
  chipContextKey?: string;
} {
  const t = text.toLowerCase();
  if (t.includes("lesson") || t.includes("plan")) {
    return {
      assistantText: QUICK_MOCK_REPLIES["Plan a lesson"],
      chipContextKey: "plan_lesson",
    };
  }
  if (t.includes("progress") || t.includes("student") || t.includes("child")) {
    return {
      assistantText: QUICK_MOCK_REPLIES["Check student's progress"],
      chipContextKey: "progress_snapshot",
    };
  }
  if (t.includes("report") || t.includes("parent") || t.includes("send")) {
    return {
      assistantText: QUICK_MOCK_REPLIES["Send progress report"],
      chipContextKey: "report_draft",
    };
  }
  if (t.includes("observation") || t.includes("log") || t.includes("observe")) {
    return {
      assistantText: QUICK_MOCK_REPLIES["Log an observation"],
      chipContextKey: "observation_scaffold",
    };
  }
  return {
    assistantText: DEFAULT_FREE_TEXT_REPLY,
    chipContextKey: "default_followup",
  };
}

function newMessageId() {
  return globalThis.crypto?.randomUUID?.() ?? `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type FloatingMenuLayout = {
  left: number;
  bottom: number;
  maxHeight: number;
  width: number;
};

function measureMenuAboveAnchor(
  rect: DOMRect,
  opts: { menuWidth: number; gap?: number; viewportPad?: number },
): FloatingMenuLayout {
  const gap = opts.gap ?? 8;
  const pad = opts.viewportPad ?? 8;
  const vw = typeof window !== "undefined" ? window.innerWidth : 400;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const width = Math.min(opts.menuWidth, vw - pad * 2);
  let left = rect.left;
  left = Math.min(Math.max(pad, left), vw - width - pad);
  const bottom = vh - rect.top + gap;
  const maxHeight = Math.max(96, rect.top - gap - pad);
  return { left, bottom, maxHeight, width };
}

function measureSettingsMenuAboveAnchor(
  rect: DOMRect,
  opts: {
    menuWidth: number;
    minWidth?: number;
    gap?: number;
    viewportPad?: number;
  },
): FloatingMenuLayout {
  const gap = opts.gap ?? 8;
  const pad = opts.viewportPad ?? 8;
  const vw = typeof window !== "undefined" ? window.innerWidth : 400;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const maxW = vw - pad * 2;
  const minW = Math.min(opts.minWidth ?? 280, maxW);
  const width = Math.min(maxW, Math.max(minW, Math.min(opts.menuWidth, maxW)));
  let left = rect.right - width;
  left = Math.min(Math.max(pad, left), vw - width - pad);
  const bottom = vh - rect.top + gap;
  const maxHeight = Math.max(120, rect.top - gap - pad);
  return { left, bottom, maxHeight, width };
}

export function FloatingNurtureAI() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [webAccessOn, setWebAccessOn] = useState(false);
  const [appsIntegrationsOn, setAppsIntegrationsOn] = useState(false);
  const [lessonScope, setLessonScope] = useState<"my" | "all">("my");
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const inputId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const addMenuAnchorRef = useRef<HTMLDivElement>(null);
  const addMenuPopupRef = useRef<HTMLDivElement>(null);
  const settingsMenuAnchorRef = useRef<HTMLDivElement>(null);
  const settingsMenuPopupRef = useRef<HTMLDivElement>(null);
  const [addMenuLayout, setAddMenuLayout] = useState<FloatingMenuLayout | null>(
    null,
  );
  const [settingsMenuLayout, setSettingsMenuLayout] =
    useState<FloatingMenuLayout | null>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setChatMenuOpen(false);
    setAddMenuOpen(false);
    setSettingsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!isTeacherExperiencePath(pathname)) close();
  }, [pathname, close]);

  const startNewChat = useCallback(() => {
    setThread([]);
    setInput("");
    setChatMenuOpen(false);
    setAddMenuOpen(false);
    setSettingsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (addMenuOpen) {
          setAddMenuOpen(false);
          return;
        }
        if (settingsMenuOpen) {
          setSettingsMenuOpen(false);
          return;
        }
        if (chatMenuOpen) {
          setChatMenuOpen(false);
          return;
        }
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, chatMenuOpen, addMenuOpen, settingsMenuOpen]);

  useEffect(() => {
    if (!chatMenuOpen) return;
    function onPointerDown(e: PointerEvent) {
      const el = menuRef.current;
      if (el && !el.contains(e.target as Node)) setChatMenuOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [chatMenuOpen]);

  useLayoutEffect(() => {
    if (!addMenuOpen) {
      setAddMenuLayout(null);
      return;
    }
    function update() {
      const anchor = addMenuAnchorRef.current;
      if (!anchor) return;
      setAddMenuLayout(
        measureMenuAboveAnchor(anchor.getBoundingClientRect(), {
          menuWidth: 260,
        }),
      );
    }
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [addMenuOpen]);

  useLayoutEffect(() => {
    if (!settingsMenuOpen) {
      setSettingsMenuLayout(null);
      return;
    }
    function update() {
      const anchor = settingsMenuAnchorRef.current;
      if (!anchor) return;
      setSettingsMenuLayout(
        measureSettingsMenuAboveAnchor(anchor.getBoundingClientRect(), {
          menuWidth: 320,
          minWidth: 288,
        }),
      );
    }
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [settingsMenuOpen]);

  useEffect(() => {
    if (!addMenuOpen) return;
    function onPointerDown(e: PointerEvent) {
      const t = e.target as Node;
      if (
        addMenuAnchorRef.current?.contains(t) ||
        addMenuPopupRef.current?.contains(t)
      ) {
        return;
      }
      setAddMenuOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [addMenuOpen]);

  useEffect(() => {
    if (!settingsMenuOpen) return;
    function onPointerDown(e: PointerEvent) {
      const t = e.target as Node;
      if (
        settingsMenuAnchorRef.current?.contains(t) ||
        settingsMenuPopupRef.current?.contains(t)
      ) {
        return;
      }
      setSettingsMenuOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [settingsMenuOpen]);

  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [thread, open]);

  const layoutTransition = reduceMotion
    ? { duration: 0.1 }
    : {
        type: "spring" as const,
        stiffness: 900,
        damping: 52,
        mass: 0.42,
        bounce: 0,
      };

  const pushExchange = useCallback(
    (userText: string, assistantText: string, chipContextKey?: string) => {
      setThread((prev) => [
        ...prev,
        { id: newMessageId(), role: "user", content: userText },
        {
          id: newMessageId(),
          role: "assistant",
          content: assistantText,
          ...(chipContextKey ? { chipContextKey } : {}),
        },
      ]);
    },
    [],
  );

  const onQuickAction = useCallback(
    (label: string) => {
      const reply = QUICK_MOCK_REPLIES[label] ?? DEFAULT_FREE_TEXT_REPLY;
      const chipContextKey =
        QUICK_ACTION_CHIP_KEY[label] ?? "default_followup";
      pushExchange(label, reply, chipContextKey);
    },
    [pushExchange],
  );

  const sendFromInput = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const { assistantText, chipContextKey } = resolveAssistantTurn(text);
    pushExchange(text, assistantText, chipContextKey);
  }, [input, pushExchange]);

  const onChipReply = useCallback(
    (chip: ChipDefinition) => {
      pushExchange(
        chip.userMessage,
        chip.assistantReply,
        chip.nextChipContextKey,
      );
    },
    [pushExchange],
  );

  const activeChips = useMemo(() => {
    const last = thread[thread.length - 1];
    if (!last || last.role !== "assistant" || !last.chipContextKey) return null;
    return CHIP_SETS[last.chipContextKey] ?? null;
  }, [thread]);

  const canSend = input.trim().length > 0;

  if (!isTeacherExperiencePath(pathname)) return null;

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close AI assistant"
          className="fixed inset-0 z-90 cursor-default bg-black/25 backdrop-blur-[2px] motion-safe:animate-in motion-safe:fade-in-0 motion-reduce:animate-none"
          onClick={close}
        />
      )}

      <div
        className={cn(
          "fixed z-100 flex flex-col items-end gap-3",
          "bottom-4 right-4 sm:bottom-6 sm:right-6",
        )}
      >
        {!open ? (
          <motion.button
            type="button"
            layoutId="nurture-floating-ai-shell"
            transition={layoutTransition}
            onClick={() => setOpen(true)}
            className={cn(
              "flex size-14 items-center justify-center rounded-full",
              "border border-white/10 bg-[#2a2a2a] text-white shadow-lg",
              "ring-1 ring-white/5 transition-[box-shadow,transform] hover:scale-[1.03] hover:shadow-xl",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2383E2] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-warm",
            )}
            aria-expanded={false}
            aria-haspopup="dialog"
            aria-label="Open Nurture AI"
          >
            <Sparkles className="size-6" strokeWidth={1.75} aria-hidden />
          </motion.button>
        ) : (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            layoutId="nurture-floating-ai-shell"
            transition={layoutTransition}
            className={cn(
              "flex w-[min(100vw-2rem,420px)] flex-col overflow-visible",
              "max-h-[min(100vh-2rem,600px)] min-h-[min(100vh-2rem,520px)]",
              "rounded-[22px] border border-[#3a3a3a] bg-[#1F1F1F] text-[#e8e8e8] shadow-2xl",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex shrink-0 items-center justify-between gap-2 px-4 pt-4 pb-2">
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setChatMenuOpen((v) => !v)}
                  aria-expanded={chatMenuOpen}
                  aria-haspopup="listbox"
                  className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-[#e0e0e0] transition-colors hover:bg-white/5"
                >
                  New AI chat
                  <ChevronDown
                    className={cn("size-4 opacity-60 transition-transform", chatMenuOpen && "rotate-180")}
                    aria-hidden
                  />
                </button>
                {chatMenuOpen && (
                  <div
                    role="listbox"
                    className="absolute left-0 top-full z-10 mt-1 min-w-[200px] rounded-xl border border-white/10 bg-[#2a2a2a] py-1 shadow-xl"
                  >
                    <button
                      type="button"
                      role="option"
                      onClick={startNewChat}
                      className="flex w-full px-3 py-2 text-left text-sm text-[#e8e8e8] hover:bg-white/10"
                    >
                      Start new conversation
                    </button>
                    <div className="border-t border-white/10 px-3 py-2 text-xs text-[#888]">
                      {thread.length === 0
                        ? "No messages in this chat yet."
                        : `${thread.length} message${thread.length === 1 ? "" : "s"} in thread`}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-0.5">
                <IconHeaderButton label="New chat" Icon={SquarePen} onClick={startNewChat} />
                <IconHeaderButton label="Minimize" Icon={Minus} onClick={close} />
              </div>
            </header>

            <div
              ref={threadRef}
              className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-3 pt-2"
            >
              <h2
                id={titleId}
                className={cn(
                  "mb-4 text-center text-lg font-semibold tracking-tight text-white",
                  thread.length > 0 && "sr-only",
                )}
              >
                {thread.length > 0 ? "Nurture AI assistant" : "How can I help?"}
              </h2>

              {thread.length > 0 && (
                <ul className="mb-4 flex w-full flex-col gap-3" aria-live="polite">
                  {thread.map((m) => (
                    <li
                      key={m.id}
                      className={cn(
                        "flex",
                        m.role === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[min(100%,340px)] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug",
                          m.role === "user"
                            ? "bg-[#2383E2] text-white"
                            : "border border-white/10 bg-[#262626] text-[#e0e0e0]",
                        )}
                      >
                        <MessageContent text={m.content} isUser={m.role === "user"} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {activeChips && activeChips.length > 0 && (
                <div
                  className="mt-1 w-full shrink-0 border-t border-white/10 pt-3 pb-1"
                  role="group"
                  aria-label="Suggested replies"
                >
                  <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-[#5a5a5a]">
                    Quick reply
                  </p>
                  <div className="flex flex-wrap justify-end gap-2">
                    {activeChips.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => onChipReply(chip)}
                        className="rounded-full border border-white/15 bg-[#2a2a2a] px-3 py-1.5 text-left text-[13px] leading-snug text-[#d0d0d0] transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2383E2]"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {thread.length === 0 && (
                <ul className="flex w-full max-w-sm flex-col gap-0.5">
                  {SUGGESTIONS.map(({ label, Icon }) => (
                    <li key={label}>
                      <button
                        type="button"
                        onClick={() => onQuickAction(label)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[#b8b8b8] transition-colors hover:bg-white/6 hover:text-[#e8e8e8]"
                      >
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/6 text-[#c4c4c4]">
                          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="text-[15px]">{label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="shrink-0 border-t border-white/8 bg-[#1a1a1a] p-3">
              <div className="overflow-visible rounded-xl border-2 border-[#2383E2] bg-[#121212]">
                <div className="flex items-start gap-2 border-b border-white/8 px-3 py-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#1e1e1e] px-2.5 py-1 text-xs font-medium text-[#b0b0b0]">
                    <FileText className="size-3.5 opacity-70" aria-hidden />
                    Nurture
                  </span>
                </div>
                <label htmlFor={inputId} className="sr-only">
                  Message Nurture AI
                </label>
                <textarea
                  id={inputId}
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (canSend) sendFromInput();
                    }
                  }}
                  placeholder="Do anything with AI…"
                  className="w-full resize-none border-0 bg-transparent px-3 pt-2 text-sm text-[#e0e0e0] placeholder:text-[#6a6a6a] focus:outline-none focus:ring-0"
                />
                <div className="flex items-center justify-between px-2 pb-2 pt-1">
                  <div className="flex items-center gap-0.5">
                    <div ref={addMenuAnchorRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setSettingsMenuOpen(false);
                          setAddMenuOpen((v) => !v);
                        }}
                        aria-expanded={addMenuOpen}
                        aria-haspopup="menu"
                        aria-label="Add to message"
                        className="flex size-8 items-center justify-center rounded-lg text-[#888] transition-colors hover:bg-white/8 hover:text-[#ccc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2383E2]"
                      >
                        <Plus className="size-[18px]" strokeWidth={1.75} aria-hidden />
                      </button>
                    </div>
                    <div ref={settingsMenuAnchorRef}>
                      <button
                        type="button"
                        onClick={() => {
                          setAddMenuOpen(false);
                          setSettingsMenuOpen((v) => !v);
                        }}
                        aria-expanded={settingsMenuOpen}
                        aria-haspopup="dialog"
                        aria-label="Assistant settings"
                        className="flex size-8 items-center justify-center rounded-lg text-[#888] transition-colors hover:bg-white/8 hover:text-[#ccc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2383E2]"
                      >
                        <SlidersHorizontal
                          className="size-[18px]"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#888]">Auto</span>
                    <button
                      type="button"
                      disabled={!canSend}
                      onClick={sendFromInput}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full transition-colors",
                        canSend
                          ? "bg-[#2383E2] text-white hover:bg-[#1a6ec0]"
                          : "bg-[#333] text-[#666] cursor-not-allowed",
                      )}
                      aria-label="Send message"
                    >
                      <ArrowUp className="size-4" strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </footer>
            {typeof document !== "undefined" &&
              addMenuOpen &&
              addMenuLayout &&
              createPortal(
                <div
                  ref={addMenuPopupRef}
                  role="menu"
                  style={{
                    position: "fixed",
                    left: addMenuLayout.left,
                    bottom: addMenuLayout.bottom,
                    width: addMenuLayout.width,
                    maxHeight: addMenuLayout.maxHeight,
                    zIndex: 9999,
                  }}
                  className="overflow-y-auto rounded-xl border border-white/10 bg-[#2a2a2a] py-1 shadow-xl"
                >
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-[#e8e8e8] transition-colors hover:bg-white/10"
                    onClick={() => setAddMenuOpen(false)}
                  >
                    <Paperclip
                      className="size-[18px] shrink-0 text-[#aaa]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    Add an attachment
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-[#e8e8e8] transition-colors hover:bg-white/10"
                    onClick={() => setAddMenuOpen(false)}
                  >
                    <LayoutGrid
                      className="size-[18px] shrink-0 text-[#aaa]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    Select a domain
                  </button>
                </div>,
                document.body,
              )}
            {typeof document !== "undefined" &&
              settingsMenuOpen &&
              settingsMenuLayout &&
              createPortal(
                <div
                  ref={settingsMenuPopupRef}
                  role="dialog"
                  aria-label="Assistant settings"
                  style={{
                    position: "fixed",
                    left: settingsMenuLayout.left,
                    bottom: settingsMenuLayout.bottom,
                    width: settingsMenuLayout.width,
                    maxHeight: settingsMenuLayout.maxHeight,
                    zIndex: 9999,
                  }}
                  className="overflow-y-auto rounded-xl border border-white/10 bg-[#2a2a2a] py-2 shadow-xl"
                >
                  <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5">
                    <span className="flex min-w-0 flex-1 items-center gap-2.5 text-sm text-[#e8e8e8]">
                      <Globe
                        className="size-[18px] shrink-0 text-[#aaa]"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <span className="min-w-0 leading-snug">Web access</span>
                    </span>
                    <SettingsSwitch
                      checked={webAccessOn}
                      onCheckedChange={setWebAccessOn}
                      ariaLabel="Web access"
                    />
                  </div>
                  <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5">
                    <span className="flex min-w-0 flex-1 items-center gap-2.5 text-sm text-[#e8e8e8]">
                      <Puzzle
                        className="size-[18px] shrink-0 text-[#aaa]"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      <span className="min-w-0 leading-snug">
                        Apps and integrations
                      </span>
                    </span>
                    <SettingsSwitch
                      checked={appsIntegrationsOn}
                      onCheckedChange={setAppsIntegrationsOn}
                      ariaLabel="Apps and integrations"
                    />
                  </div>
                  <div className="border-b border-white/10 px-3 py-2.5">
                    <p className="mb-2 flex items-center gap-2.5 text-sm text-[#e8e8e8]">
                      <BookOpen
                        className="size-[18px] shrink-0 text-[#aaa]"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                      Lesson scope
                    </p>
                    <div
                      className="flex rounded-lg bg-[#1e1e1e] p-0.5"
                      role="radiogroup"
                      aria-label="Lesson library scope"
                    >
                      <button
                        type="button"
                        role="radio"
                        aria-checked={lessonScope === "my"}
                        onClick={() => setLessonScope("my")}
                        className={cn(
                          "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors",
                          lessonScope === "my"
                            ? "bg-[#3a3a3a] text-white shadow-sm"
                            : "text-[#888] hover:text-[#ccc]",
                        )}
                      >
                        <BookUser
                          className="size-3.5 shrink-0 opacity-80"
                          strokeWidth={2}
                          aria-hidden
                        />
                        My lessons
                      </button>
                      <button
                        type="button"
                        role="radio"
                        aria-checked={lessonScope === "all"}
                        onClick={() => setLessonScope("all")}
                        className={cn(
                          "flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-medium transition-colors",
                          lessonScope === "all"
                            ? "bg-[#3a3a3a] text-white shadow-sm"
                            : "text-[#888] hover:text-[#ccc]",
                        )}
                      >
                        <Library
                          className="size-3.5 shrink-0 opacity-80"
                          strokeWidth={2}
                          aria-hidden
                        />
                        All lessons
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm text-[#e8e8e8] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:bg-white/10"
                  >
                    <Cable
                      className="size-[18px] shrink-0 text-[#aaa]"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    Connect apps
                  </button>
                </div>,
                document.body,
              )}
          </motion.div>
        )}
      </div>
    </>
  );
}

function SettingsSwitch({
  checked,
  onCheckedChange,
  ariaLabel,
}: {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        onCheckedChange(!checked);
      }}
      className={cn(
        "relative z-10 h-7 w-12 shrink-0 rounded-full transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2383E2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a2a2a]",
        checked ? "bg-[#2383E2]" : "bg-[#3a3a3a]",
      )}
    >
      <span
        className={cn(
          "pointer-events-none absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out",
          checked && "translate-x-5.5",
        )}
      />
    </button>
  );
}

/** Renders **bold** segments in assistant messages (markdown-lite). */
function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  if (isUser) {
    return <span className="whitespace-pre-wrap">{text}</span>;
  }
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

function IconHeaderButton({
  Icon,
  label,
  onClick,
}: {
  Icon: typeof SquarePen;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-lg text-[#b5b5b5] transition-colors hover:bg-white/8 hover:text-white"
    >
      <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
