"use client";

import { DemoRoleBar } from "@/components/shared/DemoRoleBar";
import { DemoPersonaBar } from "@/components/shared/DemoPersonaBar";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex h-screen min-h-0 flex-col overflow-hidden"
      style={{ background: "var(--color-bg-warm)" }}
    >
      <DemoRoleBar activeRole="parent" />
      <DemoPersonaBar role="parent" />
      {/*
        Match teacher demo: lock viewport height so only the app column scrolls.
        Prevents document scroll that shifts the demo top bars.
      */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
