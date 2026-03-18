"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { getTeacherDisplayName } from "@/lib/display-name";
import { StudentSearch } from "./StudentSearch";

const NAV_ITEMS = [
  {
    href: "/teacher/class",
    label: "Class",
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
    label: "Calendar",
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
  const { classes, teachers, activeClassId, setActiveClass } = useStore();
  const activeClass = classes.find((c) => c.id === activeClassId) ?? classes[0];
  const activeTeacher = teachers.find((t) =>
    t.classIds.includes(activeClass.id),
  );
  const [classMenuOpen, setClassMenuOpen] = useState(false);

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

          {/* Class picker */}
          <div className="relative">
            <button
              onClick={() => setClassMenuOpen((o) => !o)}
              className="w-full flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-bg-cream"
              style={{
                color: "var(--color-text-mid)",
                borderColor: "var(--color-border)",
                background: classMenuOpen
                  ? "var(--color-bg-cream)"
                  : "transparent",
              }}
            >
              <span className="truncate">{activeClass.name}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="shrink-0 transition-transform"
                style={{ transform: classMenuOpen ? "rotate(180deg)" : "none" }}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {classMenuOpen && (
              <div
                className="absolute left-0 right-0 mt-1 rounded-xl border bg-white shadow-lg z-50 overflow-hidden"
                style={{ borderColor: "var(--color-border)" }}
              >
                {classes.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => {
                      setActiveClass(cls.id);
                      setClassMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2 transition-colors hover:bg-bg-cream"
                    style={{
                      color:
                        cls.id === activeClassId
                          ? "var(--color-primary)"
                          : "var(--color-text-dark)",
                      background:
                        cls.id === activeClassId
                          ? "var(--color-primary-wash)"
                          : "transparent",
                    }}
                  >
                    {cls.id === activeClassId && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M1.5 5l2.5 2.5 4.5-4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {cls.id !== activeClassId && <span className="w-[10px]" />}
                    {cls.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pt-3 pb-1">
          <StudentSearch />
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
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Teacher info */}
        <div
          className="px-5 py-4 border-t border-[var(--color-border)]"
          style={{ color: "var(--color-text-muted)" }}
        >
          <p
            className="text-xs font-medium"
            style={{ color: "var(--color-text-mid)" }}
          >
            {activeTeacher ? getTeacherDisplayName(activeTeacher) : "—"}
          </p>
          <p className="text-xs">My First Skool</p>
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
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
