"use client";

import { use, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ImagePlus, Send } from "lucide-react";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getTeacherDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import type { TeacherUpdateMedia } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const then = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.floor(
    (today.getTime() - then.getTime()) / (1000 * 60 * 60 * 24),
  );
  const time = d.toLocaleTimeString("en-SG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  if (diff === 0) return `Today, ${time}`;
  if (diff === 1) return `Yesterday, ${time}`;
  return (
    d.toLocaleDateString("en-SG", { day: "numeric", month: "short" }) +
    `, ${time}`
  );
}

function MediaPreview({ media }: { media: TeacherUpdateMedia }) {
  if (media.type === "photo") {
    return (
      <div
        className="rounded-xl overflow-hidden border mt-2"
        style={{ borderColor: "var(--color-border)", maxWidth: 240 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.url}
          alt=""
          className="w-full max-h-40 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='140' fill='%23ddd'%3E%3Crect width='240' height='140'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='12'%3EPhoto%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
    );
  }
  return (
    <div
      className="rounded-xl border flex items-center gap-2 mt-2 px-3 py-2"
      style={{
        borderColor: "var(--color-border)",
        background: "var(--color-bg-cream)",
      }}
    >
      <span className="text-lg">🎬</span>
      <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        Video shared
      </span>
    </div>
  );
}

export default function TeacherChatPage({
  params,
}: {
  params: Promise<{ childId: string }>;
}) {
  const { childId } = use(params);
  const store = useStore();
  const child = store.children.find((c) => c.id === childId);
  const activeClass = child
    ? store.classes.find((c) => c.id === child.classId)
    : null;
  const activeTeacher = activeClass
    ? store.teachers.find((t) => t.classIds.includes(activeClass.id))
    : null;

  const messages = store.chatMessages
    .filter((m) => m.childId === childId)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

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

  useEffect(() => {
    store.markThreadRead(childId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childId]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || !child) return;
    const teacherId = activeTeacher?.id ?? "teacher-1";
    if (scope === "class" && activeClass) {
      store.broadcastChatMessage(
        activeClass.id,
        teacherId,
        "teacher",
        kind,
        trimmed,
        media,
      );
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
    return (
      <div className="p-8 text-center text-muted-foreground">
        Child not found.
      </div>
    );
  }

  return (
    <div className="flex h-screen max-w-2xl flex-col bg-background md:h-[calc(100vh-0px)]">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-background px-4 py-3">
        <Link
          href="/teacher/messages"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-sm" }),
            "-ml-1 shrink-0",
          )}
          aria-label="Back"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <ChildAvatar name={getChildDisplayName(child)} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            {getChildDisplayName(child)}
          </p>
          <p className="text-xs text-muted-foreground">
            {activeClass?.name ?? "Class"} ·{" "}
            {activeTeacher ? getTeacherDisplayName(activeTeacher) : "Teacher"}
          </p>
        </div>
      </div>

      {/* Thread */}
      <div
        ref={threadRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 py-16">
            <div className="text-3xl">💬</div>
            <p
              className="text-sm text-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              No messages yet. Start the conversation with{" "}
              {getChildDisplayName(child)}'s parents.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isTeacher = msg.senderType === "teacher";
            const sender = isTeacher
              ? store.teachers.find((t) => t.id === msg.senderId)
              : store.parents?.find((p) => p.id === msg.senderId);
            const senderName = isTeacher
              ? sender
                ? getTeacherDisplayName(
                    sender as Parameters<typeof getTeacherDisplayName>[0],
                  )
                : "Teacher"
              : sender
                ? `${(sender as { firstName: string }).firstName}`
                : "Parent";

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isTeacher ? "" : "flex-row-reverse"}`}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-white mt-0.5"
                  style={{
                    background: isTeacher ? "var(--color-primary)" : "#7BA3D4",
                  }}
                >
                  {senderName.charAt(0).toUpperCase()}
                </div>

                <div
                  className={`flex flex-col gap-1 max-w-[75%] ${isTeacher ? "items-start" : "items-end"}`}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--color-text-mid)" }}
                    >
                      {senderName}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>

                  <div
                    className="rounded-2xl px-3.5 py-2.5"
                    style={{
                      background: isTeacher
                        ? "var(--color-primary-wash)"
                        : "var(--color-bg-deep)",
                      borderRadius: isTeacher
                        ? "4px 18px 18px 18px"
                        : "18px 4px 18px 18px",
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {msg.text}
                    </p>
                    {msg.media.map((m, i) => (
                      <MediaPreview key={i} media={m} />
                    ))}
                  </div>

                  {msg.kind === "progress_update" && (
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--color-primary-wash)",
                        color: "var(--color-primary)",
                      }}
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

      <div className="shrink-0 border-t border-border bg-background px-4 py-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {(["message", "progress_update"] as const).map((k) => (
            <Button
              key={k}
              type="button"
              variant={kind === k ? "secondary" : "outline"}
              size="xs"
              className={cn(
                "rounded-full font-semibold",
                kind === k && "border-primary/30 bg-primary/10 text-primary",
              )}
              onClick={() => setKind(k)}
            >
              {k === "message" ? "Message" : "Progress update"}
            </Button>
          ))}
          <div className="h-3.5 w-px shrink-0 bg-border" />
          {(["child", "class"] as const).map((s) => (
            <Button
              key={s}
              type="button"
              variant={scope === s ? "secondary" : "outline"}
              size="xs"
              className={cn(
                "rounded-full font-semibold",
                scope === s &&
                  "border-amber-400/50 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:text-amber-100",
              )}
              onClick={() => setScope(s)}
            >
              {s === "child"
                ? `${getChildDisplayName(child)} only`
                : "Whole class"}
            </Button>
          ))}
        </div>

        {showMedia && (
          <div className="mb-2 flex flex-wrap gap-2">
            <select
              value={newMediaType}
              onChange={(e) =>
                setNewMediaType(e.target.value as "photo" | "video")
              }
              className="h-8 rounded-lg border border-input bg-background px-2 text-xs text-foreground"
            >
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
            <Input
              type="url"
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              placeholder="Paste URL…"
              className="min-w-0 flex-1 text-xs"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 font-semibold"
              onClick={addMedia}
              disabled={!newMediaUrl.trim()}
            >
              Add
            </Button>
          </div>
        )}
        {media.length > 0 && (
          <p className="mb-1.5 text-xs text-muted-foreground">
            {media.length} media attached ·{" "}
            <button
              type="button"
              className="font-medium text-primary underline-offset-2 hover:underline"
              onClick={() => setMedia([])}
            >
              remove all
            </button>
          </p>
        )}

        <div className="flex items-end gap-2">
          <Button
            type="button"
            variant={showMedia ? "secondary" : "outline"}
            size="icon-sm"
            className="shrink-0 rounded-xl"
            onClick={() => setShowMedia((v) => !v)}
            aria-label="Attach media"
          >
            <ImagePlus className="size-4" />
          </Button>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Message ${getChildDisplayName(child)}'s parents…`}
            rows={1}
            className="min-h-10 max-h-[120px] flex-1 resize-none rounded-xl border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />

          <Button
            type="button"
            size="icon-sm"
            className="shrink-0 rounded-xl"
            onClick={handleSend}
            disabled={!text.trim()}
            aria-label="Send"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
