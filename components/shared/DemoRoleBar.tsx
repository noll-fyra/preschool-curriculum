"use client";

import Link from "next/link";

type Role = "teacher" | "student" | "parent" | "admin";

interface DemoRoleBarProps {
  activeRole: Role;
}

const ROLES = [
  { id: "teacher" as Role, label: "Teacher", href: "/demo/teacher" },
  { id: "student" as Role, label: "Child",   href: "/demo/child"   },
  { id: "parent"  as Role, label: "Parent",  href: "/demo/parent"  },
  { id: "admin"   as Role, label: "Admin",   href: "/admin"        },
];

export function DemoRoleBar({ activeRole }: DemoRoleBarProps) {
  return (
    <div
      className="relative flex items-center justify-between px-4 h-11 border-b shrink-0 z-40"
      style={{
        background: "white",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Center title */}
      <span
        className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold tracking-wide uppercase pointer-events-none"
        style={{ color: "var(--color-text-muted)" }}
        aria-hidden="true"
      >
        Demo
      </span>

      {/* Home */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold tracking-wide uppercase border transition-colors"
        style={{
          color: "var(--color-text-mid)",
          borderColor: "var(--color-border)",
          background: "var(--color-bg-warm)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background =
            "var(--color-bg-cream)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background =
            "var(--color-bg-warm)";
        }}
      >
        ← Home
      </Link>

      {/* Role tabs */}
      <div className="flex items-center gap-1">
        {ROLES.map((role) => {
          const active = role.id === activeRole;
          return (
            <Link
              key={role.id}
              href={role.href}
              className="px-3 py-1 rounded-full text-sm font-medium transition-colors"
              style={{
                background: active ? "var(--color-primary)" : "transparent",
                color: active ? "white" : "var(--color-text-mid)",
              }}
            >
              {role.label}
            </Link>
          );
        })}

      </div>
    </div>
  );
}
