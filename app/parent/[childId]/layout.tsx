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

function ReportsIcon({ active }: { active: boolean }) {
  const c = active ? "var(--color-primary)" : "var(--color-text-muted)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h4" />
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

  const isActivities = pathname.includes("/activities");
  const isMessages = pathname.includes("/messages");
  const isReports = pathname.includes("/reports");
  const isHome = !isActivities && !isMessages && !isReports;

  const tabs = [
    {
      label: "Home",
      href: `/parent/${childId}`,
      active: isHome,
      Icon: HomeIcon,
    },
    {
      label: "Activities",
      href: `/parent/${childId}/activities`,
      active: isActivities,
      Icon: ActivitiesIcon,
    },
    {
      label: "Messages",
      href: `/parent/${childId}/messages`,
      active: isMessages,
      Icon: MessagesIcon,
    },
    {
      label: "Reports",
      href: `/parent/${childId}/reports`,
      active: isReports,
      Icon: ReportsIcon,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-bg-warm)" }}>
      {/* Scrollable content with bottom padding to clear tab bar */}
      <div className="flex-1 overflow-y-auto pb-20">
        {children}
      </div>

      {/* Fixed bottom tab bar */}
      <div
        className="fixed bottom-0 left-0 right-0 flex border-t z-50"
        style={{
          background: "white",
          borderColor: "var(--color-border)",
        }}
      >
        {tabs.map(({ label, href, active, Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1"
            style={{ color: active ? "var(--color-primary)" : "var(--color-text-muted)" }}
          >
            <Icon active={active} />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
