"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { getFlaggedChildren } from "@/lib/dashboard-utils";
import { getWeekStart } from "@/lib/assignments";
import { getActiveClassChildren } from "@/lib/selectors";

type NotifTab = "for_you" | "updates" | "reminders";

// Term end date for demo
const TERM_END = new Date("2026-03-28");

function daysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

interface NotificationItem {
  id: string;
  label: string;
  sublabel?: string;
  href?: string;
  onClick?: () => void;
  dot?: "red" | "amber" | "green";
}

interface NotificationsPanelProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ open, onClose }: NotificationsPanelProps) {
  const [tab, setTab] = useState<NotifTab>("for_you");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const store = useStore();
  const {
    chatMessages,
    observations,
    milestones,
    sessions,
    children,
    classes,
    activeClassId,
    reports,
    progress,
  } = store;

  const classChildren = useMemo(
    () => getActiveClassChildren(store),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, activeClassId]
  );
  const classChildIds = useMemo(() => new Set(classChildren.map((c) => c.id)), [classChildren]);

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const weekStart = getWeekStart(now);

  // ── For You ──────────────────────────────────────────────────────────────────

  // Unread parent message threads
  const unreadThreadChildIds = useMemo(() => {
    const seen = new Set<string>();
    for (const m of chatMessages) {
      if (m.senderType === "parent" && !m.readAt && classChildIds.has(m.childId)) {
        seen.add(m.childId);
      }
    }
    return seen;
  }, [chatMessages, classChildIds]);

  // Flagged children
  const flaggedChildIds = useMemo(
    () => getFlaggedChildren(classChildren, observations, chatMessages, milestones, today),
    [classChildren, observations, chatMessages, milestones, today]
  );

  // Report drafts ready (obs ≥ 3, no report)
  const reportReadyChildIds = useMemo(() => {
    return classChildren
      .filter((child) => {
        const hasReport = reports.some((r) => r.childId === child.id);
        if (hasReport) return false;
        const obsCount = observations.filter((o) => o.childId === child.id).length;
        return obsCount >= 3;
      })
      .map((c) => c.id);
  }, [classChildren, observations, reports]);

  const forYouItems: NotificationItem[] = useMemo(() => {
    const items: NotificationItem[] = [];

    for (const childId of Array.from(unreadThreadChildIds)) {
      const id = `unread-${childId}`;
      if (dismissed.has(id)) continue;
      const child = children.find((c) => c.id === childId);
      if (!child) continue;
      items.push({
        id,
        label: `New message from ${getChildDisplayName(child)}'s family`,
        sublabel: "Tap to open thread",
        href: `/teacher/messages/${childId}`,
        dot: "red",
      });
    }

    for (const childId of Array.from(flaggedChildIds)) {
      const id = `flagged-${childId}`;
      if (dismissed.has(id)) continue;
      const child = children.find((c) => c.id === childId);
      if (!child) continue;
      items.push({
        id,
        label: `${getChildDisplayName(child)} needs attention`,
        sublabel: "Low observation coverage or no recent activity",
        href: `/teacher/child/${childId}`,
        dot: "amber",
      });
    }

    for (const childId of reportReadyChildIds) {
      const id = `report-${childId}`;
      if (dismissed.has(id)) continue;
      const child = children.find((c) => c.id === childId);
      if (!child) continue;
      items.push({
        id,
        label: `${getChildDisplayName(child)}'s report is ready to generate`,
        sublabel: "Enough observations collected",
        href: "/teacher/reports",
        dot: "green",
      });
    }

    return items;
  }, [unreadThreadChildIds, flaggedChildIds, reportReadyChildIds, children, dismissed]);

  // ── Updates ──────────────────────────────────────────────────────────────────

  const recentlyAchievedMilestones = useMemo(() => {
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    return progress
      .filter(
        (p) =>
          p.status === "achieved" &&
          p.achievedAt &&
          p.achievedAt >= sevenDaysAgo &&
          classChildIds.has(p.childId)
      )
      .slice(0, 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, classChildIds]);

  const updatesItems: NotificationItem[] = useMemo(() => {
    const items: NotificationItem[] = [];
    for (const p of recentlyAchievedMilestones) {
      const child = children.find((c) => c.id === p.childId);
      const milestone = milestones.find((m) => m.id === p.milestoneId);
      if (!child || !milestone) continue;
      items.push({
        id: `achieved-${p.milestoneId}-${p.childId}`,
        label: `${getChildDisplayName(child)} achieved ${milestone.id}`,
        sublabel: milestone.statement,
        href: `/teacher/child/${p.childId}?tab=milestones`,
        dot: "green",
      });
    }
    return items;
  }, [recentlyAchievedMilestones, children, milestones]);

  // ── Reminders ────────────────────────────────────────────────────────────────

  const remindersItems: NotificationItem[] = useMemo(() => {
    const items: NotificationItem[] = [];
    const daysLeft = daysUntil(TERM_END);

    if (daysLeft <= 14) {
      items.push({
        id: "term-deadline",
        label: `Reports due in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`,
        sublabel: `${classChildren.filter((c) => !reports.some((r) => r.childId === c.id && r.status === "published")).length} not yet sent`,
        href: "/teacher/reports",
        dot: daysLeft <= 7 ? "red" : "amber",
      });
    }

    // Children not observed in 7+ days
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    for (const child of classChildren) {
      const lastObs = observations
        .filter((o) => o.childId === child.id)
        .sort((a, b) => b.observedAt.localeCompare(a.observedAt))[0];
      if (!lastObs || lastObs.observedAt < sevenDaysAgo) {
        items.push({
          id: `no-obs-${child.id}`,
          label: `${getChildDisplayName(child)} hasn't been observed recently`,
          sublabel: lastObs ? `Last: ${lastObs.observedAt}` : "No observations yet",
          href: `/teacher/child/${child.id}`,
          dot: "amber",
        });
      }
    }

    return items;
  }, [classChildren, observations, reports, now]);

  // ── Badge count (For You only) ────────────────────────────────────────────────
  void weekStart; // consumed via getFlaggedChildren dependency
  void classes;
  void sessions;

  if (!open) return null;

  const tabItems =
    tab === "for_you" ? forYouItems : tab === "updates" ? updatesItems : remindersItems;

  const tabBadge = forYouItems.length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.25)" }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — slides in from right on desktop, bottom sheet on mobile */}
      <div
        className="fixed z-50 bg-white shadow-2xl flex flex-col"
        style={{
          // Desktop: right slide-in panel
          right: 0,
          top: 0,
          bottom: 0,
          width: "clamp(320px, 30vw, 400px)",
          borderLeft: "1px solid var(--color-border)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <span className="font-bold text-base" style={{ color: "var(--color-text-dark)" }}>
            Notifications
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-text-muted)",
              padding: 4,
            }}
            aria-label="Close notifications"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex px-5 gap-1 pt-3 pb-0"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          {(
            [
              { key: "for_you" as NotifTab, label: "For You", badge: tabBadge },
              { key: "updates" as NotifTab, label: "Updates" },
              { key: "reminders" as NotifTab, label: "Reminders" },
            ] as { key: NotifTab; label: string; badge?: number }[]
          ).map(({ key, label, badge }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium"
              style={{
                color: tab === key ? "var(--color-primary)" : "var(--color-text-muted)",
                background: "none",
                border: "none",
                borderBottom: tab === key ? "2px solid var(--color-primary)" : "2px solid transparent",
                cursor: "pointer",
                marginBottom: -1,
              }}
            >
              {label}
              {badge !== undefined && badge > 0 && (
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "#E8745A", color: "#fff", minWidth: 18, textAlign: "center" }}
                >
                  {badge > 9 ? "9+" : badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-3">
          {tabItems.length === 0 ? (
            <p className="text-sm text-center py-10" style={{ color: "var(--color-text-muted)" }}>
              All clear
            </p>
          ) : (
            <div className="flex flex-col">
              {tabItems.map((item) => (
                <NotifRow
                  key={item.id}
                  item={item}
                  onDismiss={() => setDismissed((prev) => new Set(prev).add(item.id))}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function NotifRow({
  item,
  onDismiss,
  onClose,
}: {
  item: NotificationItem;
  onDismiss: () => void;
  onClose: () => void;
}) {
  const dotColors = { red: "#E8745A", amber: "#F5A623", green: "#4A9B6F" };

  const inner = (
    <div
      className="flex items-start gap-3 px-5 py-3.5 hover:bg-[var(--color-bg-warm)] transition-colors"
      style={{ cursor: item.href || item.onClick ? "pointer" : "default" }}
    >
      {item.dot && (
        <span
          className="mt-1 flex-shrink-0 w-2 h-2 rounded-full"
          style={{ background: dotColors[item.dot] }}
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: "var(--color-text-dark)" }}>
          {item.label}
        </p>
        {item.sublabel && (
          <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
            {item.sublabel}
          </p>
        )}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDismiss();
        }}
        className="flex-shrink-0 text-xs"
        style={{
          color: "var(--color-text-muted)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px 4px",
        }}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );

  if (item.href) {
    return (
      <Link href={item.href} onClick={onClose} style={{ textDecoration: "none" }}>
        {inner}
      </Link>
    );
  }
  return <div onClick={item.onClick}>{inner}</div>;
}
