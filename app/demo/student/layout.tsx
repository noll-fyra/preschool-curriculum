"use client";

import { DemoRoleBar } from "@/components/shared/DemoRoleBar";

/** Alias route → `/demo/child`; keep layout light until redirect runs. */
export default function DemoStudentLayout({
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
