"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getTeacherDisplayName } from "@/lib/display-name";
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
          className="w-full max-h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='160' fill='%23ddd'%3E%3Crect width='240' height='160'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='12'%3EPhoto%3C/text%3E%3C/svg%3E";
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

export default function ParentMessagesPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();
  const child = store.children.find((c) => c.id === childId);
  const activeClass = child ? store.classes.find((c) => c.id === child.classId) : null;
  const classTeacher = activeClass
    ? store.teachers.find((t) => t.classIds.includes(activeClass.id))
    : null;

  // Demo parent ID — use demoPersona.parentId
  const parentId = store.demoPersona.parentId;

  const [filter, setFilter] = useState<"all" | "progress">("all");
  const [text, setText] = useState("");
  const [showMedia, setShowMedia] = useState(false);
  const [media, setMedia] = useState<TeacherUpdateMedia[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState<"photo" | "video">("photo");

  const threadRef = useRef<HTMLDivElement>(null);

  const allMessages = store.chatMessages
    .filter((m) => m.childId === childId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const visibleMessages = filter === "progress"
    ? allMessages.filter((m) => m.kind === "progress_update")
    : allMessages;

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [visibleMessages.length]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    store.postChatMessage({
      childId,
      senderId: parentId,
      senderType: "parent",
      kind: "message",
      text: trimmed,
      media,
    });
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

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 68px)" /* subtract bottom tab bar */ }}>
      {/* Header */}
      <div className="px-4 pt-5 pb-3 shrink-0">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h1 className="font-medium" style={{ fontSize: 22, color: "var(--color-text-dark)" }}>
              Messages
            </h1>
            <p className="font-medium mt-0.5" style={{ fontSize: 14, color: "var(--color-text-dark)" }}>
              {classTeacher ? getTeacherDisplayName(classTeacher) : "Class teacher"}
            </p>
            <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
              {activeClass?.name ?? "Class"}
              {child ? ` · ${getChildDisplayName(child)}'s thread` : ""}
            </p>
          </div>
        </div>

        {/* Filter toggle */}
        <div className="flex gap-2">
          {(["all", "progress"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
              style={{
                background: filter === f ? "var(--color-primary-wash)" : "transparent",
                color: filter === f ? "var(--color-primary)" : "var(--color-text-muted)",
                borderColor: filter === f ? "var(--color-primary)" : "var(--color-border)",
              }}
            >
              {f === "all" ? "All messages" : "Progress updates"}
            </button>
          ))}
        </div>
      </div>

      {/* Thread */}
      <div ref={threadRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {visibleMessages.length === 0 ? (
          <div
            className="rounded-2xl border p-6 text-center mt-4"
            style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
          >
            <div className="text-3xl mb-3">💬</div>
            <p className="leading-relaxed" style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
              {filter === "progress"
                ? "No progress updates yet. Your child's teacher will share milestones and learning moments here."
                : `No messages yet. Your child's teacher will post updates here, and you can reply directly.`}
            </p>
          </div>
        ) : (
          visibleMessages.map((msg) => {
            const isParent = msg.senderType === "parent";
            const teacher = !isParent ? store.teachers.find((t) => t.id === msg.senderId) : null;
            const teacherName = teacher ? getTeacherDisplayName(teacher) : "Teacher";

            return (
              <div key={msg.id} className={`flex gap-2.5 ${isParent ? "flex-row-reverse" : ""}`}>
                {/* Avatar */}
                {!isParent && (
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-white mt-0.5"
                    style={{ background: "var(--color-primary)" }}
                  >
                    {teacherName.charAt(0).toUpperCase()}
                  </div>
                )}
                {isParent && (
                  <div
                    className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-white mt-0.5"
                    style={{ background: "#7BA3D4" }}
                  >
                    Y
                  </div>
                )}

                <div className={`flex flex-col gap-1 max-w-[78%] ${isParent ? "items-end" : "items-start"}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-medium" style={{ color: "var(--color-text-mid)" }}>
                      {isParent ? "You" : teacherName}
                    </span>
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>

                  <div
                    className="px-3.5 py-2.5"
                    style={{
                      background: isParent ? "var(--color-bg-deep)" : "var(--color-primary-wash)",
                      borderRadius: isParent ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
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
            placeholder="Send a message…"
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
