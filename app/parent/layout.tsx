"use client";

import { DemoRoleBar } from "@/components/shared/DemoRoleBar";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-bg-warm)" }}>
      <DemoRoleBar activeRole="parent" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
