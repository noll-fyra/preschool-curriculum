"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { getChildDisplayName } from "@/lib/display-name";
import { ChildAvatar } from "./ChildAvatar";

interface StudentSearchProps {
  onClose?: () => void; // called after a student is selected (for overlay mode)
  autoFocus?: boolean;
}

export function StudentSearch({ onClose, autoFocus }: StudentSearchProps) {
  const router = useRouter();
  const { children, classes, setActiveClass } = useStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = query.trim().toLowerCase();
  const results =
    trimmed.length === 0
      ? []
      : children
          .filter((c) => getChildDisplayName(c).toLowerCase().includes(trimmed))
          .sort((a, b) => getChildDisplayName(a).localeCompare(getChildDisplayName(b)))
          .slice(0, 8);

  function handleSelect(childId: string, classId: string) {
    setActiveClass(classId);
    router.push(`/teacher/child/${childId}`);
    setQuery("");
    setOpen(false);
    onClose?.();
  }

  // Close on outside click
  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        onClose?.();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div ref={containerRef} className="relative">
      {/* Input */}
      <div className="relative">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ color: "var(--color-text-muted)" }}
        >
          <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9.5 9.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          autoFocus={autoFocus}
          type="text"
          placeholder="Search students…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { if (trimmed) setOpen(true); }}
          className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border outline-none transition-colors"
          style={{
            background: "var(--color-bg-warm)",
            borderColor: "var(--color-border)",
            color: "var(--color-text-dark)",
          }}
          onMouseDown={(e) => e.stopPropagation()}
        />
      </div>

      {/* Dropdown */}
      {open && trimmed.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-1 rounded-xl border bg-white shadow-xl z-[60] overflow-hidden"
          style={{ borderColor: "var(--color-border)" }}
        >
          {results.length === 0 ? (
            <p
              className="px-4 py-3 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              No students found
            </p>
          ) : (
            results.map((child) => {
              const cls = classes.find((c) => c.id === child.classId);
              return (
                <button
                  key={child.id}
                  onMouseDown={(e) => e.preventDefault()} // keep focus on input
                  onClick={() => handleSelect(child.id, child.classId)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-bg-cream transition-colors"
                >
                  <ChildAvatar name={getChildDisplayName(child)} size="sm" />
                  <div className="min-w-0">
                    <p
                      className="text-sm font-medium leading-tight"
                      style={{ color: "var(--color-text-dark)" }}
                    >
                      {getChildDisplayName(child)}
                    </p>
                    <p className="text-xs leading-tight" style={{ color: "var(--color-text-muted)" }}>
                      {cls ? cls.name : "Unassigned"}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
