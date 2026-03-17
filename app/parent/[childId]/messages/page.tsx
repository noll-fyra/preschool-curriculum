"use client";

import { useParams } from "next/navigation";
import { useStore, type NurtureStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getTeacherDisplayName } from "@/lib/display-name";
import type { TeacherUpdate, TeacherUpdateMedia } from "@/lib/types";

function formatMessageTime(iso: string): string {
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
      <div className="rounded-xl overflow-hidden border mt-2" style={{ borderColor: "var(--color-border)", maxWidth: 280 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.url}
          alt=""
          className="w-full max-h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='160' fill='%23ddd'%3E%3Crect width='280' height='160'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='14'%3EPhoto%3C/text%3E%3C/svg%3E";
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
      <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
        Video shared
      </span>
    </div>
  );
}

export default function ParentMessagesPage() {
  const params = useParams();
  const childId = params.childId as string;
  const store = useStore();
  const child = store.children.find((c) => c.id === childId);

  const visibleUpdates = store.teacherUpdates
    .filter(
      (u) =>
        u.classId === child?.classId &&
        (u.childIds.length === 0 || u.childIds.includes(childId))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const activeClass = child
    ? store.classes.find((c) => c.id === child.classId)
    : null;
  const classTeacher = activeClass
    ? store.teachers.find((t) => t.classIds.includes(activeClass.id))
    : null;

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1
          className="font-medium"
          style={{ fontSize: 22, color: "var(--color-text-dark)" }}
        >
          Messages
        </h1>
        <div className="mt-1">
          <p className="font-medium" style={{ fontSize: 14, color: "var(--color-text-dark)" }}>
            {classTeacher ? getTeacherDisplayName(classTeacher) : "Class teacher"}
          </p>
          <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
            {activeClass?.name ?? "Class"}
            {child ? ` · ${getChildDisplayName(child)}'s updates` : ""}
          </p>
        </div>
      </div>

      {/* Updates feed */}
      {visibleUpdates.length === 0 ? (
        <div
          className="rounded-2xl border p-6 text-center"
          style={{ background: "var(--color-bg-cream)", borderColor: "var(--color-border)" }}
        >
          <div className="text-3xl mb-3">💬</div>
          <p
            className="leading-relaxed"
            style={{ fontSize: 13, color: "var(--color-text-muted)" }}
          >
            No updates yet. Your child&apos;s teacher will share photos, videos and notes here when they post to the class or tag {child ? getChildDisplayName(child) : "your child"}.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visibleUpdates.map((update) => (
            <MessageCard key={update.id} update={update} store={store} />
          ))}
        </div>
      )}
    </div>
  );
}

function MessageCard({
  update,
  store,
}: {
  update: TeacherUpdate;
  store: NurtureStore;
}) {
  const teacher = store.teachers.find((t) => t.id === update.teacherId);
  const isClassLevel = update.childIds.length === 0;

  return (
    <div
      className="rounded-2xl border p-4"
      style={{ background: "white", borderColor: "var(--color-border)" }}
    >
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
            {isClassLevel ? "Class update" : "Update for your child"} · {formatMessageTime(update.createdAt)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-dark)" }}>
        {update.text}
      </p>

      {update.media.length > 0 && (
        <div className="mt-3 space-y-2">
          {update.media.map((m, i) => (
            <MediaPreview key={i} media={m} />
          ))}
        </div>
      )}
    </div>
  );
}
