"use client";

import { useState } from "react";
import { TeacherNav } from "@/components/teacher/TeacherNav";
import { DemoRoleBar } from "@/components/shared/DemoRoleBar";
import { DemoPersonaBar } from "@/components/shared/DemoPersonaBar";
import { StudentSearch } from "@/components/teacher/StudentSearch";
import { useStore } from "@/lib/store";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { classes, activeClassId, setActiveClass } = useStore();
  const activeClass = classes.find((c) => c.id === activeClassId) ?? classes[0];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <DemoRoleBar activeRole="teacher" />
      <DemoPersonaBar role="teacher" />

      {/* Mobile class switcher bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-2 border-b bg-white relative z-40"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>Class:</span>
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: "var(--color-text-dark)" }}
          >
            {activeClass.name}
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
              style={{ transform: mobileMenuOpen ? "rotate(180deg)" : "none" }}
            >
              <path d="M2 3.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Search icon */}
        <button
          onClick={() => { setMobileSearchOpen(true); setMobileMenuOpen(false); }}
          className="ml-auto p-1.5 rounded-lg transition-colors hover:bg-bg-cream"
          aria-label="Search students"
          style={{ color: "var(--color-text-mid)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setMobileMenuOpen(false)} />
            <div
              className="absolute top-full left-4 mt-1 rounded-xl border bg-white shadow-lg z-50 overflow-hidden min-w-[180px]"
              style={{ borderColor: "var(--color-border)" }}
            >
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => { setActiveClass(cls.id); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors hover:bg-bg-cream"
                  style={{
                    color: cls.id === activeClassId ? "var(--color-primary)" : "var(--color-text-dark)",
                    background: cls.id === activeClassId ? "var(--color-primary-wash)" : "transparent",
                  }}
                >
                  {cls.id === activeClassId && (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="shrink-0">
                      <path d="M1.5 5.5l2.5 2.5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {cls.id !== activeClassId && <span className="w-[11px]" />}
                  {cls.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mobile search overlay */}
      {mobileSearchOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setMobileSearchOpen(false)}
        >
          <div
            className="bg-white px-4 pt-4 pb-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <StudentSearch
                  autoFocus
                  onClose={() => setMobileSearchOpen(false)}
                />
              </div>
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="text-sm font-medium shrink-0"
                style={{ color: "var(--color-text-mid)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 min-h-0" style={{ background: "var(--color-bg-warm)" }}>
        <TeacherNav />
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
