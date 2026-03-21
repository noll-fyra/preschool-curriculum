"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { getTeacherDisplayName } from "@/lib/display-name";
import { cn } from "@/lib/utils";

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
    href: "/teacher/children",
    label: "Children",
    activeOn: ["/teacher/children", "/teacher/child/"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <path d="M2 17c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 13c1.8 0 4 .8 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    href: "/teacher/observations",
    label: "Observations",
    activeOn: ["/teacher/observations", "/teacher/observe"],
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
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
      <aside className="hidden min-h-screen w-[220px] shrink-0 flex-col border-r bg-card md:flex">
        {/* Logo + class switcher */}
        <div className="border-b px-6 py-5">
          <Link href="/teacher/class" className="mb-3 flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              N
            </span>
            <span className="text-base font-bold text-foreground">Nurture</span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const paths = (item as { activeOn?: string[] }).activeOn ?? [item.href];
            const active =
              pathname === item.href ||
              paths.some((p) => p !== "/teacher/class" && pathname.startsWith(p));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                <span className="relative">
                  {item.icon}
                  {item.href === "/teacher/messages" && unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full border border-card bg-primary" />
                  )}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: teacher name + profile/settings links */}
        <div className="flex flex-col gap-1 border-t px-3 py-3">
          <p className="truncate px-3 pb-1 text-xs font-medium text-muted-foreground">
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
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile bottom tab bar — cap at 5 primary items */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t bg-card md:hidden">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const paths = (item as { activeOn?: string[] }).activeOn ?? [item.href];
          const active =
            pathname === item.href ||
            paths.some((p) => p !== "/teacher/class" && pathname.startsWith(p));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span className="relative">
                {item.icon}
                {item.href === "/teacher/messages" && unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full border border-card bg-primary" />
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
