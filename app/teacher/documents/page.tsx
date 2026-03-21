"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="mx-auto max-w-2xl px-4 py-6 md:px-6">
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Documents</h1>
        <p className="text-muted-foreground text-sm">
          Generate professional teaching documents with AI. Reports and portfolios are available from individual student profiles.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3">
        {DOC_TYPES.map((doc) => (
          <Link key={doc.href} href={doc.href} className="block">
            <Card className="shadow-none transition-colors hover:bg-accent/40">
              <CardContent className="flex items-start gap-4 py-4">
                <div
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: doc.color, color: doc.textColor }}
                >
                  {doc.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-0.5 text-sm font-semibold text-foreground">
                    {doc.title}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {doc.description}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {generatedDocuments.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Saved documents
          </h2>
          <div className="flex flex-col gap-2">
            {generatedDocuments.map((doc) => (
              <Card key={doc.id} className="shadow-none">
                <CardContent className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {doc.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {doc.type.replace("_", " ")} ·{" "}
                      {new Date(doc.createdAt).toLocaleDateString("en-SG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
