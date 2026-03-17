"use client";

import { useState } from "react";
import { useStore, type NurtureStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getTeacherDisplayName } from "@/lib/display-name";
import type { TeacherUpdateMedia } from "@/lib/types";
import { ChildAvatar } from "@/components/teacher/ChildAvatar";

export default function TeacherUpdatesPage() {
  const store = useStore();
  const activeClass = store.classes.find((c) => c.id === store.activeClassId) ?? store.classes[0];
  const classChildren = store.children.filter((c) => c.classId === activeClass.id);
  const activeTeacher = store.teachers.find((t) => t.classIds.includes(activeClass.id));
  const updates = store.teacherUpdates
    .filter((u) => u.classId === activeClass.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--color-text-dark)" }}>
            Updates
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            Share photos, videos and notes with parents
          </p>
        </div>
        <button
          onClick={() => setComposerOpen(true)}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white shrink-0"
          style={{ background: "var(--color-primary)" }}
        >
          + New update
        </button>
      </div>

      {composerOpen && (
        <UpdateComposer
          classId={activeClass.id}
          teacherId={activeTeacher?.id ?? "teacher-1"}
          children={classChildren}
          onClose={() => setComposerOpen(false)}
          onSubmit={() => setComposerOpen(false)}
        />
      )}

      <div className="flex flex-col gap-4">
        {updates.length === 0 ? (
          <div
            className="rounded-2xl border p-8 text-center"
            style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
          >
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              No updates yet. Post a photo, video or note to share with parents.
            </p>
          </div>
        ) : (
          updates.map((update) => (
            <UpdateCard key={update.id} update={update} store={store} />
          ))
        )}
      </div>
    </div>
  );
}

function UpdateCard({
  update,
  store,
}: {
  update: import("@/lib/types").TeacherUpdate;
  store: NurtureStore;
}) {
  const teacher = store.teachers.find((t) => t.id === update.teacherId);
  const isClassLevel = update.childIds.length === 0;
  const taggedChildren = isClassLevel
    ? store.children.filter((c) => c.classId === update.classId)
    : update.childIds
        .map((id) => store.children.find((c) => c.id === id))
        .filter(Boolean) as import("@/lib/types").Child[];

  const timeStr = formatUpdateTime(update.createdAt);

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "white", borderColor: "var(--color-border)" }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-sm font-semibold"
            style={{ background: "var(--color-primary)" }}
          >
            {teacher ? getTeacherDisplayName(teacher).charAt(0) : "T"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm" style={{ color: "var(--color-text-dark)" }}>
              {teacher ? getTeacherDisplayName(teacher) : "Teacher"}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              {isClassLevel
                ? `Whole class · ${timeStr}`
                : `${taggedChildren.map((c) => getChildDisplayName(c)).join(", ")} · ${timeStr}`}
            </p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-dark)" }}>
          {update.text}
        </p>

        {update.media.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {update.media.map((m, i) => (
              <MediaPreview key={i} media={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MediaPreview({ media }: { media: TeacherUpdateMedia }) {
  if (media.type === "photo") {
    return (
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--color-border)", maxWidth: 200 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.url}
          alt=""
          className="w-full h-24 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120' fill='%23ddd'%3E%3Crect width='200' height='120'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='12'%3EPhoto%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
    );
  }
  return (
    <div
      className="rounded-xl overflow-hidden border flex items-center justify-center"
      style={{ borderColor: "var(--color-border)", width: 200, height: 120, background: "var(--color-bg-deep)" }}
    >
      <span className="text-2xl">🎬</span>
      <span className="text-xs ml-1" style={{ color: "var(--color-text-muted)" }}>
        Video
      </span>
    </div>
  );
}

function UpdateComposer({
  classId,
  teacherId,
  children,
  onClose,
  onSubmit,
}: {
  classId: string;
  teacherId: string;
  children: import("@/lib/types").Child[];
  onClose: () => void;
  onSubmit: () => void;
}) {
  const store = useStore();
  const [text, setText] = useState("");
  const [scope, setScope] = useState<"class" | "students">("class");
  const [selectedChildIds, setSelectedChildIds] = useState<Set<string>>(new Set());
  const [media, setMedia] = useState<TeacherUpdateMedia[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaType, setNewMediaType] = useState<"photo" | "video">("photo");

  const toggleChild = (childId: string) => {
    setSelectedChildIds((prev) => {
      const next = new Set(prev);
      if (next.has(childId)) next.delete(childId);
      else next.add(childId);
      return next;
    });
  };

  const addMedia = () => {
    const url = newMediaUrl.trim();
    if (!url) return;
    setMedia((prev) => [...prev, { type: newMediaType, url }]);
    setNewMediaUrl("");
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    store.createTeacherUpdate({
      teacherId,
      classId,
      childIds: scope === "class" ? [] : Array.from(selectedChildIds),
      text: trimmed,
      media,
    });
    setText("");
    setScope("class");
    setSelectedChildIds(new Set());
    setMedia([]);
    onSubmit();
  };

  const canSubmit = text.trim().length > 0 && (scope === "class" || selectedChildIds.size > 0);

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
            New update
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-bg-cream"
            style={{ color: "var(--color-text-mid)" }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--color-text-mid)" }}>
              What would you like to share?
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write an update for parents…"
              rows={4}
              className="w-full rounded-xl border px-3 py-2.5 text-sm resize-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-mid)" }}>
              Who should see this?
            </label>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setScope("class")}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  background: scope === "class" ? "var(--color-primary-wash)" : "transparent",
                  color: scope === "class" ? "var(--color-primary)" : "var(--color-text-mid)",
                  borderColor: scope === "class" ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                Whole class
              </button>
              <button
                onClick={() => setScope("students")}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
                style={{
                  background: scope === "students" ? "var(--color-primary-wash)" : "transparent",
                  color: scope === "students" ? "var(--color-primary)" : "var(--color-text-mid)",
                  borderColor: scope === "students" ? "var(--color-primary)" : "var(--color-border)",
                }}
              >
                Specific students
              </button>
            </div>

            {scope === "students" && (
              <div className="flex flex-wrap gap-2">
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => toggleChild(child.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-colors"
                    style={{
                      background: selectedChildIds.has(child.id) ? "var(--color-primary-wash)" : "transparent",
                      color: selectedChildIds.has(child.id) ? "var(--color-primary)" : "var(--color-text-mid)",
                      borderColor: selectedChildIds.has(child.id) ? "var(--color-primary)" : "var(--color-border)",
                    }}
                  >
                    <ChildAvatar name={getChildDisplayName(child)} size="xs" />
                    {getChildDisplayName(child)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--color-text-mid)" }}>
              Add photos or videos (optional)
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
                placeholder={newMediaType === "photo" ? "Image URL" : "Video URL"}
                className="flex-1 rounded-lg border px-3 py-1.5 text-sm"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-dark)" }}
              />
              <button
                onClick={addMedia}
                disabled={!newMediaUrl.trim()}
                className="px-3 py-1.5 rounded-lg text-sm font-medium border disabled:opacity-50"
                style={{
                  borderColor: "var(--color-primary)",
                  color: "var(--color-primary)",
                }}
              >
                Add
              </button>
            </div>
            {media.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {media.map((m, i) => (
                  <div key={i} className="relative group">
                    <MediaPreview media={m} />
                    <button
                      onClick={() => removeMedia(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t" style={{ borderColor: "var(--color-border)" }}>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: "var(--color-primary)" }}
          >
            Post update
          </button>
        </div>
      </div>
    </div>
  );
}

function formatUpdateTime(iso: string): string {
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
