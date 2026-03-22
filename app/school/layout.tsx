"use client";

import { DemoRoleBar } from "@/components/shared/DemoRoleBar";
import { AdminNav } from "@/components/admin/AdminNav";
import { DemoPersonaBar } from "@/components/shared/DemoPersonaBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <DemoRoleBar activeRole="school" />
      <DemoPersonaBar role="school" />
      <div className="flex min-h-0 flex-1 items-stretch">
        <AdminNav />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pb-20 md:pb-0">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
