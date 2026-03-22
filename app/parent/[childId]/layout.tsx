"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

// ─── SVG icons ───────────────────────────────────────────────────────────────

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function ActivitiesIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function MessagesIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function FeedTabIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h12" />
    </svg>
  );
}

function CalendarIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 2v4M16 2v4" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" fill={c} stroke="none" />
      <rect x="11" y="13" width="3" height="3" rx="0.5" fill={c} stroke="none" />
    </svg>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function ChildParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const params = useParams();
  const childId = params.childId as string;

  const base = `/parent/${childId}`;
  const isHome = pathname === base;
  const isFeed = pathname.startsWith(`${base}/feed`);
  const isActivities = pathname.startsWith(`${base}/activities`);
  const isMessages = pathname.startsWith(`${base}/messages`);
  const isCalendar = pathname.startsWith(`${base}/calendar`);

  const tabs = [
    {
      label: "Home",
      href: base,
      active: isHome,
      Icon: HomeIcon,
    },
    {
      label: "Feed",
      href: `${base}/feed`,
      active: isFeed,
      Icon: FeedTabIcon,
    },
    {
      label: "Activities",
      href: `${base}/activities`,
      active: isActivities,
      Icon: ActivitiesIcon,
    },
    {
      label: "Messages",
      href: `${base}/messages`,
      active: isMessages,
      Icon: MessagesIcon,
    },
    {
      label: "Calendar",
      href: `${base}/calendar`,
      active: isCalendar,
      Icon: CalendarIcon,
    },
  ];

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      style={{ background: "var(--color-bg-warm)" }}
    >
      {/* Scrollable content with bottom padding to clear tab bar */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-20">
        <div className="mx-auto w-full max-w-lg min-h-min">{children}</div>
      </div>

      {/* Fixed bottom tab bar — full-width surface, tabs aligned to content column */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white"
        style={{
          borderColor: "var(--color-border)",
          /* Safe area; tab row height (~3.875rem) must match messages compose `bottom` calc. */
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <nav
          className="mx-auto flex w-full max-w-lg"
          aria-label="Parent app sections"
        >
          {tabs.map(({ label, href, active, Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5"
              style={{
                color: active ? "var(--color-primary)" : "var(--color-text-muted)",
              }}
            >
              <Icon active={active} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
