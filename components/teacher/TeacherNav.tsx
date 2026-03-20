"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { getTeacherDisplayName } from "@/lib/display-name";

const NAV_ITEMS = [
  {
    href: "/teacher/class",
    label: "Home",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          fill="currentColor"
          opacity="0.8"
        />
        <rect
          x="11"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          fill="currentColor"
          opacity="0.8"
        />
        <rect
          x="2"
          y="12"
          width="7"
          height="7"
          rx="1.5"
          fill="currentColor"
          opacity="0.4"
        />
        <rect
          x="11"
          y="12"
          width="7"
          height="7"
          rx="1.5"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
    ),
  },
  {
    href: "/teacher/messages",
    label: "Messages",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M17.5 12.5a1.5 1.5 0 01-1.5 1.5H5.5L2 17.5V4a1.5 1.5 0 011.5-1.5h12.5A1.5 1.5 0 0117.5 5v7.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/teacher/assignments",
    label: "Activities",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="2"
          width="14"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M7 7h6M7 10h6M7 13h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/teacher/reports",
    label: "Reports",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="2"
          width="14"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M7 7h6M7 10h6M7 13h3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="15" cy="14" r="3" fill="currentColor" />
        <path
          d="M14 14h2M15 13v2"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/teacher/calendar",
    label: "Schedule",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="4"
          width="16"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 2v4M14 2v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect
          x="5"
          y="11"
          width="3"
          height="3"
          rx="0.5"
          fill="currentColor"
          opacity="0.5"
        />
        <rect
          x="9"
          y="11"
          width="3"
          height="3"
          rx="0.5"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    href: "/teacher/documents",
    label: "Documents",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="2"
          width="14"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M7 6h6M7 9h6M7 12h6M7 15h3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="15.5" cy="15.5" r="2.5" fill="currentColor" opacity="0.7" />
        <path d="M14.5 15.5h2M15.5 14.5v2" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/teacher/rubric",
    label: "Rubric",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="2"
          width="14"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M7 6h6M7 9h6M7 12h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="5.5" cy="6" r="0.75" fill="currentColor" />
        <circle cx="5.5" cy="9" r="0.75" fill="currentColor" />
        <circle cx="5.5" cy="12" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
];

export function TeacherNav() {
  const pathname = usePathname();
  const { classes, teachers, activeClassId, children, chatMessages } = useStore();
  const activeClass = classes.find((c) => c.id === activeClassId) ?? classes[0];
  const activeTeacher = teachers.find((t) =>
    t.classIds.includes(activeClass.id),
  );

  const classChildIds = new Set(children.filter((c) => c.classId === activeClass.id).map((c) => c.id));
  const unreadCount = chatMessages.filter(
    (m) => m.senderType === "parent" && !m.readAt && classChildIds.has(m.childId)
  ).length;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[220px] min-h-screen border-r border-[var(--color-border)] bg-white flex-shrink-0">
        {/* Logo + class switcher */}
        <div className="px-6 py-5 border-b border-[var(--color-border)]">
          <Link href="/teacher/class" className="flex items-center gap-2 mb-3">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "var(--color-primary)" }}
            >
              N
            </span>
            <span
              className="font-bold text-base"
              style={{ color: "var(--color-text-dark)" }}
            >
              Nurture
            </span>
          </Link>

        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/teacher/class" &&
                pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: active
                    ? "var(--color-primary)"
                    : "var(--color-text-mid)",
                  background: active
                    ? "var(--color-primary-wash)"
                    : "transparent",
                }}
              >
                <span className="relative">
                  {item.icon}
                  {item.href === "/teacher/messages" && unreadCount > 0 && (
                    <span
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white"
                      style={{ background: "var(--color-primary)" }}
                    />
                  )}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: teacher name + profile/settings links */}
        <div className="border-t border-[var(--color-border)] px-3 py-3 flex flex-col gap-1">
          <p className="px-3 pb-1 text-xs font-medium truncate" style={{ color: "var(--color-text-muted)" }}>
            {activeTeacher ? getTeacherDisplayName(activeTeacher) : "—"}
          </p>
          {[
            {
              href: "/teacher/profile",
              label: "Profile",
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M3 15c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              ),
            },
            {
              href: "/teacher/settings",
              label: "Settings",
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.6 3.6l1.4 1.4M13 13l1.4 1.4M14.4 3.6l-1.4 1.4M5 13l-1.4 1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              ),
            },
          ].map(({ href, label, icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: active ? "var(--color-primary)" : "var(--color-text-mid)",
                  background: active ? "var(--color-primary-wash)" : "transparent",
                }}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] flex z-50">
        {NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/teacher/class" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium"
              style={{
                color: active
                  ? "var(--color-primary)"
                  : "var(--color-text-muted)",
              }}
            >
              <span className="relative">
                {item.icon}
                {item.href === "/teacher/messages" && unreadCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white"
                    style={{ background: "var(--color-primary)" }}
                  />
                )}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
