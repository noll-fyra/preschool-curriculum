"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/school/dashboard",
    label: "Dashboard",
    mobileHide: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.9" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    href: "/school/attendance",
    label: "Attendance",
    mobileHide: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/school/classes",
    label: "Classes",
    mobileHide: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M2 17c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M9 17c0-1.9 1.1-3.5 2.7-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    href: "/school/teachers",
    label: "Teachers",
    mobileHide: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    href: "/school/activities",
    label: "Curriculum",
    mobileHide: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/school/calendar",
    label: "Calendar",
    mobileHide: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M2 8h16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 2v4M14 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="5" y="11" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.5" />
        <rect x="9" y="11" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    href: "/school/engagement",
    label: "Engagement",
    mobileHide: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H8l-4 3v-3H5a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/school/outcomes",
    label: "Outcomes",
    mobileHide: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 15l4-5 3 3 4-6 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((i) => !i.mobileHide);

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/school/dashboard" &&
      href !== "/school/classes" &&
      href !== "/school/attendance" &&
      pathname.startsWith(href)) ||
    (href === "/school/classes" &&
      (pathname === "/school/classes" || pathname.startsWith("/school/classes/")));

  return (
    <>
      <aside className="hidden md:flex flex-col w-[220px] min-h-screen border-r border-[var(--color-border)] bg-white flex-shrink-0">
        <div className="px-6 py-5 border-b border-[var(--color-border)]">
          <Link href="/school/dashboard" className="flex items-center gap-2">
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
              Nurture School
            </span>
          </Link>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: active ? "var(--color-primary)" : "var(--color-text-mid)",
                  background: active ? "var(--color-primary-wash)" : "transparent",
                }}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] flex z-50">
        {MOBILE_NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium"
              style={{
                color: active ? "var(--color-primary)" : "var(--color-text-muted)",
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
