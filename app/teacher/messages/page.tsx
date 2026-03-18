"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getTeacherDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import type { ChatMessage, TeacherUpdateMedia } from "@/lib/types";

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const then = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.floor((today.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return d.toLocaleTimeString("en-SG", { hour: "numeric", minute: "2-digit", hour12: true });
  if (diff === 1) return "Yesterday";
  if (diff < 7) return d.toLocaleDateString("en-SG", { weekday: "short" });
  return d.toLocaleDateString("en-SG", { day: "numeric", month: "short" });
}

function getLastMessage(messages: ChatMessage[]): ChatMessage | null {
  if (messages.length === 0) return null;
  return messages.reduce((latest, m) =>
    new Date(m.createdAt) > new Date(latest.createdAt) ? m : latest
  );
}

export default function TeacherMessagesPage() {
  const store = useStore();
  const activeClass = store.classes.find((c) => c.id === store.activeClassId) ?? store.classes[0];
  const classChildren = store.children.filter((c) => c.classId === activeClass.id);
  const activeTeacher = store.teachers.find((t) => t.classIds.includes(activeClass.id));

  const [broadcastOpen, setBroadcastOpen] = useState(false);

  // Sort children by most recent message descending, then alphabetically
  const childrenWithLatest = classChildren.map((child) => {
    const msgs = store.chatMessages.filter((m) => m.childId === child.id);
    const last = getLastMessage(msgs);
    return { child, last, msgCount: msgs.length };
  }).sort((a, b) => {
    if (a.last && b.last) return new Date(b.last.createdAt).getTime() - new Date(a.last.createdAt).getTime();
    if (a.last) return -1;
    if (b.last) return 1;
    return getChildDisplayName(a.child).localeCompare(getChildDisplayName(b.child));
  });

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Messages
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            {activeClass.name} · per-child conversations
          </p>
        </div>
        <button
          onClick={() => setBroadcastOpen(true)}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white shrink-0"
          style={{ background: "var(--color-primary)" }}
        >
          Broadcast to class
        </button>
      </div>

      {broadcastOpen && (
        <BroadcastComposer
          classId={activeClass.id}
          teacherId={activeTeacher?.id ?? "teacher-1"}
          onClose={() => setBroadcastOpen(false)}
        />
      )}

      <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-border)" }}>
        {childrenWithLatest.map(({ child, last }) => {
          const isParentLast = last?.senderType === "parent";
          return (
            <Link
              key={child.id}
              href={`/teacher/messages/${child.id}`}
              className="flex items-center gap-3 py-3.5 hover:bg-bg-cream rounded-xl px-2 -mx-2 transition-colors"
            >
              <ChildAvatar name={getChildDisplayName(child)} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className="font-semibold text-sm truncate"
                    style={{ color: "var(--color-text-dark)", fontWeight: isParentLast ? 700 : 600 }}
                  >
                    {getChildDisplayName(child)}
                  </p>
                  {last && (
                    <span className="text-xs shrink-0" style={{ color: "var(--color-text-muted)" }}>
                      {formatTime(last.createdAt)}
                    </span>
                  )}
                </div>
                {last ? (
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{
                      color: isParentLast ? "var(--color-text-dark)" : "var(--color-text-muted)",
                      fontWeight: isParentLast ? 500 : 400,
                    }}
                  >
                    {last.senderType === "parent" ? "Parent: " : ""}
                    {last.text.length > 60 ? last.text.slice(0, 60) + "…" : last.text}
                  </p>
                ) : (
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    No messages yet
                  </p>
                )}
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "var(--color-text-muted)", flexShrink: 0 }}>
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function BroadcastComposer({
  classId,
  teacherId,
  onClose,
}: {
  classId: string;
  teacherId: string;
  onClose: () => void;
}) {
  const store = useStore();
  const [text, setText] = useState("");
  const [kind, setKind] = useState<"message" | "progress_update">("message");
  const [media, setMedia] = useState<TeacherUpdateMedia[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState<"photo" | "video">("photo");

  const addMedia = () => {
    const url = newMediaUrl.trim();
    if (!url) return;
    setMedia((prev) => [...prev, { type: newMediaType, url }]);
    setNewMediaUrl("");
  };

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    store.broadcastChatMessage(classId, teacherId, "teacher", kind, trimmed, media);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl md:rounded-2xl border-t md:border bg-white shadow-xl"
        style={{ borderColor: "var(--color-border)", maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between px-4 py-3 border-b bg-white z-10" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="font-semibold" style={{ color: "var(--color-text-dark)" }}>
            Broadcast to whole class
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg" style={{ color: "var(--color-text-mid)" }} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Kind toggle */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-mid)" }}>
              Type
            </label>
            <div className="flex gap-2">
              {(["message", "progress_update"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setKind(k)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
                  style={{
                    background: kind === k ? "var(--color-primary-wash)" : "transparent",
                    color: kind === k ? "var(--color-primary)" : "var(--color-text-mid)",
                    borderColor: kind === k ? "var(--color-primary)" : "var(--color-border)",
                  }}
                >
                  {k === "message" ? "Message" : "Progress update"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-mid)" }}>
              Message
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message for all parents…"
              rows={4}
              className="w-full rounded-xl border px-3 py-2.5 text-sm resize-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
            />
          </div>

          {/* Media */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-mid)" }}>
              Add media (optional)
            </label>
            <div className="flex gap-2 mb-2">
              <select
                value={newMediaType}
                onChange={(e) => setNewMediaType(e.target.value as "photo" | "video")}
                className="rounded-lg border px-2 py-1.5 text-sm"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
              <input
                type="url"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                placeholder="URL"
                className="flex-1 rounded-lg border px-3 py-1.5 text-sm"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
              />
              <button
                onClick={addMedia}
                disabled={!newMediaUrl.trim()}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border disabled:opacity-50"
                style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
              >
                Add
              </button>
            </div>
            {media.length > 0 && (
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {media.length} media item{media.length > 1 ? "s" : ""} attached
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: "var(--color-primary)" }}
          >
            Send to all parents
          </button>
        </div>
      </div>
    </div>
  );
}
