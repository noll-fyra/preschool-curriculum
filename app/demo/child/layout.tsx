"use client";

import { DemoRoleBar } from "@/components/shared/DemoRoleBar";

/** Handoff entry: teacher picks a child before the student shell (persona bar) appears. */
export default function DemoChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--color-bg-warm)" }}
    >
      <DemoRoleBar activeRole="student" />
      <main className="flex-1">{children}</main>
    </div>
  );
}

