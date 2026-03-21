"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";
import type { ChatMessage, TeacherUpdateMedia } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
    const hasUnread = msgs.some((m) => m.senderType === "parent" && !m.readAt);
    return { child, last, msgCount: msgs.length, hasUnread };
  }).sort((a, b) => {
    if (a.last && b.last) return new Date(b.last.createdAt).getTime() - new Date(a.last.createdAt).getTime();
    if (a.last) return -1;
    if (b.last) return 1;
    return getChildDisplayName(a.child).localeCompare(getChildDisplayName(b.child));
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:px-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {activeClass.name} · per-child conversations
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          className="shrink-0 font-semibold"
          onClick={() => setBroadcastOpen(true)}
        >
          Broadcast to class
        </Button>
      </div>

      {broadcastOpen && (
        <BroadcastComposer
          classId={activeClass.id}
          teacherId={activeTeacher?.id ?? "teacher-1"}
          onClose={() => setBroadcastOpen(false)}
        />
      )}

      <Card className="shadow-none">
        <div className="flex flex-col py-1">
          {childrenWithLatest.map(({ child, last, hasUnread }, i) => (
            <div key={child.id}>
              {i > 0 ? <Separator className="my-0" /> : null}
              <Link
                href={`/teacher/messages/${child.id}`}
                className="hover:bg-accent/50 -mx-1 flex items-center gap-3 rounded-lg px-3 py-3.5 transition-colors"
              >
                <ChildAvatar name={getChildDisplayName(child)} size="md" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "truncate text-sm",
                        hasUnread ? "font-bold text-foreground" : "font-semibold text-foreground"
                      )}
                    >
                      {getChildDisplayName(child)}
                    </p>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {hasUnread && (
                        <span
                          className="bg-primary size-2 shrink-0 rounded-full"
                          aria-hidden
                        />
                      )}
                      {last && (
                        <span className="text-xs text-muted-foreground">
                          {formatTime(last.createdAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  {last ? (
                    <p
                      className={cn(
                        "mt-0.5 truncate text-xs",
                        hasUnread ? "font-medium text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {last.senderType === "parent" ? "Parent: " : ""}
                      {last.text.length > 60 ? `${last.text.slice(0, 60)}…` : last.text}
                    </p>
                  ) : (
                    <p className="text-muted-foreground mt-0.5 text-xs">No messages yet</p>
                  )}
                </div>
                <ChevronRight className="text-muted-foreground size-4 shrink-0" />
              </Link>
            </div>
          ))}
        </div>
      </Card>
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
        <div className="border-border sticky top-0 z-10 flex items-center justify-between border-b bg-card px-4 py-3">
          <h2 className="font-semibold text-foreground">Broadcast to whole class</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <Label className="mb-2 block text-xs">Type</Label>
            <div className="bg-muted flex gap-1 rounded-lg p-1">
              {(["message", "progress_update"] as const).map((k) => (
                <Button
                  key={k}
                  type="button"
                  size="sm"
                  variant={kind === k ? "default" : "ghost"}
                  className="flex-1 shadow-none"
                  onClick={() => setKind(k)}
                >
                  {k === "message" ? "Message" : "Progress update"}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="broadcast-text" className="mb-1.5 block text-xs">
              Message
            </Label>
            <textarea
              id="broadcast-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message for all parents…"
              rows={4}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-lg border px-3 py-2.5 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            />
          </div>

          <div>
            <Label className="mb-2 block text-xs">Add media (optional)</Label>
            <div className="mb-2 flex flex-wrap gap-2">
              <select
                value={newMediaType}
                onChange={(e) =>
                  setNewMediaType(e.target.value as "photo" | "video")
                }
                className="border-input bg-background h-8 rounded-lg border px-2 text-sm"
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
              <Input
                type="url"
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                placeholder="URL"
                className="min-w-[8rem] flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMedia}
                disabled={!newMediaUrl.trim()}
              >
                Add
              </Button>
            </div>
            {media.length > 0 && (
              <p className="text-muted-foreground text-xs">
                {media.length} media item{media.length > 1 ? "s" : ""} attached
              </p>
            )}
          </div>
        </div>

        <div className="border-border border-t p-4">
          <Button
            type="button"
            className="w-full font-semibold"
            onClick={handleSubmit}
            disabled={!text.trim()}
          >
            Send to all parents
          </Button>
        </div>
      </div>
    </div>
  );
}
