"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getTeacherDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import type { TeacherUpdateMedia } from "@/lib/types";

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const then = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.floor((today.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
  const time = d.toLocaleTimeString("en-SG", { hour: "numeric", minute: "2-digit", hour12: true });
  if (diff === 0) return `Today, ${time}`;
  if (diff === 1) return `Yesterday, ${time}`;
  return d.toLocaleDateString("en-SG", { day: "numeric", month: "short" }) + `, ${time}`;
}

function MediaPreview({ media }: { media: TeacherUpdateMedia }) {
  if (media.type === "photo") {
    return (
      <div className="rounded-xl overflow-hidden border mt-2" style={{ borderColor: "var(--color-border)", maxWidth: 240 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.url}
          alt=""
          className="w-full max-h-40 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='140' fill='%23ddd'%3E%3Crect width='240' height='140'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='12'%3EPhoto%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
    );
  }
  return (
    <div
      className="rounded-xl border flex items-center gap-2 mt-2 px-3 py-2"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-cream)" }}
    >
      <span className="text-lg">🎬</span>
      <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>Video shared</span>
    </div>
  );
}

export default function TeacherChatPage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = use(params);
  const store = useStore();
  const child = store.children.find((c) => c.id === childId);
  const activeClass = child ? store.classes.find((c) => c.id === child.classId) : null;
  const activeTeacher = activeClass
    ? store.teachers.find((t) => t.classIds.includes(activeClass.id))
    : null;

  const messages = store.chatMessages
    .filter((m) => m.childId === childId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const [text, setText] = useState("");
  const [kind, setKind] = useState<"message" | "progress_update">("message");
  const [scope, setScope] = useState<"child" | "class">("child");
  const [showMedia, setShowMedia] = useState(false);
  const [media, setMedia] = useState<TeacherUpdateMedia[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState<"photo" | "video">("photo");

  const threadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || !child) return;
    const teacherId = activeTeacher?.id ?? "teacher-1";
    if (scope === "class" && activeClass) {
      store.broadcastChatMessage(activeClass.id, teacherId, "teacher", kind, trimmed, media);
    } else {
      store.postChatMessage({
        childId,
        senderId: teacherId,
        senderType: "teacher",
        kind,
        text: trimmed,
        media,
      });
    }
    setText("");
    setMedia([]);
    setShowMedia(false);
  };

  const addMedia = () => {
    const url = newMediaUrl.trim();
    if (!url) return;
    setMedia((prev) => [...prev, { type: newMediaType, url }]);
    setNewMediaUrl("");
  };

  if (!child) {
    return <div className="p-8 text-center" style={{ color: "var(--color-text-muted)" }}>Child not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh-0px)] max-w-2xl">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b bg-white shrink-0"
        style={{ borderColor: "var(--color-border)" }}
      >
        <Link
          href="/teacher/messages"
          className="p-1.5 rounded-lg -ml-1"
          style={{ color: "var(--color-text-mid)" }}
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <ChildAvatar name={getChildDisplayName(child)} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
            {getChildDisplayName(child)}
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            {activeClass?.name ?? "Class"} · {activeTeacher ? getTeacherDisplayName(activeTeacher) : "Teacher"}
          </p>
        </div>
      </div>

      {/* Thread */}
      <div ref={threadRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 py-16">
            <div className="text-3xl">💬</div>
            <p className="text-sm text-center" style={{ color: "var(--color-text-muted)" }}>
              No messages yet. Start the conversation with {getChildDisplayName(child)}&apos;s parents.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isTeacher = msg.senderType === "teacher";
            const sender = isTeacher
              ? store.teachers.find((t) => t.id === msg.senderId)
              : store.parents?.find((p) => p.id === msg.senderId);
            const senderName = isTeacher
              ? (sender ? getTeacherDisplayName(sender as Parameters<typeof getTeacherDisplayName>[0]) : "Teacher")
              : (sender ? `${(sender as { firstName: string }).firstName}` : "Parent");

            return (
              <div key={msg.id} className={`flex gap-2.5 ${isTeacher ? "" : "flex-row-reverse"}`}>
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-white mt-0.5"
                  style={{ background: isTeacher ? "var(--color-primary)" : "#7BA3D4" }}
                >
                  {senderName.charAt(0).toUpperCase()}
                </div>

                <div className={`flex flex-col gap-1 max-w-[75%] ${isTeacher ? "items-start" : "items-end"}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-medium" style={{ color: "var(--color-text-mid)" }}>
                      {senderName}
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>

                  <div
                    className="rounded-2xl px-3.5 py-2.5"
                    style={{
                      background: isTeacher ? "var(--color-primary-wash)" : "var(--color-bg-deep)",
                      borderRadius: isTeacher ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                    }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-dark)" }}>
                      {msg.text}
                    </p>
                    {msg.media.map((m, i) => <MediaPreview key={i} media={m} />)}
                  </div>

                  {msg.kind === "progress_update" && (
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: "var(--color-primary-wash)", color: "var(--color-primary)" }}
                    >
                      Progress update
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Compose bar */}
      <div
        className="border-t bg-white px-4 py-3 shrink-0"
        style={{ borderColor: "var(--color-border)" }}
      >
        {/* Kind + scope toggles */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {(["message", "progress_update"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className="px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
              style={{
                background: kind === k ? "var(--color-primary-wash)" : "transparent",
                color: kind === k ? "var(--color-primary)" : "var(--color-text-muted)",
                borderColor: kind === k ? "var(--color-primary)" : "var(--color-border)",
              }}
            >
              {k === "message" ? "Message" : "Progress update"}
            </button>
          ))}
          <div className="h-3.5 w-px" style={{ background: "var(--color-border)" }} />
          {(["child", "class"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className="px-2.5 py-1 rounded-full text-xs font-medium border transition-colors"
              style={{
                background: scope === s ? "#FFF3E0" : "transparent",
                color: scope === s ? "#A06010" : "var(--color-text-muted)",
                borderColor: scope === s ? "#F5A623" : "var(--color-border)",
              }}
            >
              {s === "child" ? `${getChildDisplayName(child)} only` : "Whole class"}
            </button>
          ))}
        </div>

        {/* Media inline input */}
        {showMedia && (
          <div className="flex gap-2 mb-2">
            <select
              value={newMediaType}
              onChange={(e) => setNewMediaType(e.target.value as "photo" | "video")}
              className="rounded-lg border px-2 py-1.5 text-xs"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
            <input
              type="url"
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              placeholder="Paste URL…"
              className="flex-1 rounded-lg border px-3 py-1.5 text-xs"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
            />
            <button
              onClick={addMedia}
              disabled={!newMediaUrl.trim()}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border disabled:opacity-50"
              style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
            >
              Add
            </button>
          </div>
        )}
        {media.length > 0 && (
          <p className="text-xs mb-1.5" style={{ color: "var(--color-text-muted)" }}>
            {media.length} media attached · <button className="underline" onClick={() => setMedia([])}>remove all</button>
          </p>
        )}

        <div className="flex items-end gap-2">
          <button
            onClick={() => setShowMedia((v) => !v)}
            className="p-2 rounded-xl border transition-colors shrink-0"
            style={{
              borderColor: showMedia ? "var(--color-primary)" : "var(--color-border)",
              color: showMedia ? "var(--color-primary)" : "var(--color-text-muted)",
            }}
            aria-label="Attach media"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="6.5" cy="7.5" r="1.5" fill="currentColor" opacity="0.6" />
              <path d="M2 12l4-3 3 3 2-2 5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
            }}
            placeholder={`Message ${getChildDisplayName(child)}'s parents…`}
            rows={1}
            className="flex-1 rounded-xl border px-3 py-2 text-sm resize-none"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-dark)",
              minHeight: 40,
              maxHeight: 120,
            }}
          />

          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="p-2 rounded-xl text-white shrink-0 disabled:opacity-50 transition-opacity"
            style={{ background: "var(--color-primary)" }}
            aria-label="Send"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M15.5 2.5L8 10M15.5 2.5L10.5 15.5 8 10M15.5 2.5L2.5 7l5.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
