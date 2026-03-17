"use client";

import { DemoRoleBar } from "@/components/shared/DemoRoleBar";
import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-bg-warm)" }}>
      <DemoRoleBar activeRole="admin" />
      <div className="flex flex-1 min-h-0">
        <AdminNav />
        <main className="flex-1 min-w-0 pb-20 md:pb-0">{children}</main>
      </div>
    </div>
  );
}
