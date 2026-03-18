"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

const DOC_TYPES = [
  {
    href: "/teacher/documents/curriculum",
    title: "Curriculum Plan",
    description: "Generate a term-long curriculum plan for your class with weekly themes, objectives, and activities.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M6 7h10M6 11h10M6 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#E8F0FE",
    textColor: "#3B5AC6",
  },
  {
    href: "/teacher/documents/evaluation",
    title: "Student Evaluation",
    description: "Create a formal developmental evaluation for a student with assessed competencies and recommendations.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M6 7h6M6 11h10M6 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="7" r="2" fill="currentColor" opacity="0.6" />
        <path d="M15.2 7l1 1 1.5-1.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#E8F5EE",
    textColor: "#2D7A4F",
  },
  {
    href: "/teacher/documents/proposal",
    title: "Event / Activity Proposal",
    description: "Draft a professional proposal for a school event or special activity for admin approval.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="3" width="18" height="17" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M7 3V1M15 3V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 8h18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 13h4M7 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="13" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    color: "#FEF3D7",
    textColor: "#A06010",
  },
];

export default function DocumentsPage() {
  const { generatedDocuments } = useStore();

  return (
    <div className="px-5 py-6 md:px-8 md:py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text-dark)" }}>
          Documents
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Generate professional teaching documents with AI. Reports and portfolios are available from individual student profiles.
        </p>
      </div>

      {/* Document type cards */}
      <div className="flex flex-col gap-3 mb-8">
        {DOC_TYPES.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            className="flex items-start gap-4 rounded-2xl border p-4 transition-colors hover:bg-[var(--color-bg-cream)]"
            style={{ borderColor: "var(--color-border)", background: "white" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: doc.color, color: doc.textColor }}
            >
              {doc.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-text-dark)" }}>
                {doc.title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {doc.description}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" style={{ color: "var(--color-text-muted)" }}>
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Saved documents */}
      {generatedDocuments.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--color-text-dark)" }}>
            Saved documents
          </h2>
          <div className="flex flex-col gap-2">
            {generatedDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                style={{ borderColor: "var(--color-border)", background: "white" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "var(--color-text-dark)" }}>
                    {doc.title}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {doc.type.replace("_", " ")} ·{" "}
                    {new Date(doc.createdAt).toLocaleDateString("en-SG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
