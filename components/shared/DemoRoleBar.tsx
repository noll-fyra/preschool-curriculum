"use client";

import Link from "next/link";

type Role = "teacher" | "student" | "parent" | "admin";

interface DemoRoleBarProps {
  activeRole: Role;
}

const ROLES = [
  { id: "teacher" as Role, label: "Teacher", href: "/teacher/class" },
  { id: "student" as Role, label: "Student", href: "/student" },
  { id: "parent"  as Role, label: "Parent",  href: "/parent"       },
  { id: "admin"   as Role, label: "Admin",   href: "/admin"        },
];

export function DemoRoleBar({ activeRole }: DemoRoleBarProps) {
  return (
    <div
      className="flex items-center justify-between px-4 h-11 border-b shrink-0 z-40"
      style={{
        background: "white",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Branding */}
      <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--color-text-muted)" }}>
        Demo
      </span>

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
