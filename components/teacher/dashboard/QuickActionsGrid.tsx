"use client";

import { useRouter } from "next/navigation";

interface QuickActionsGridProps {
  onLogObservation: () => void;
}

interface Action {
  label: string;
  icon: string;
  onClick: () => void;
}

export function QuickActionsGrid({ onLogObservation }: QuickActionsGridProps) {
  const router = useRouter();

  const actions: Action[] = [
    {
      label: "Log observation",
      icon: "📝",
      onClick: onLogObservation,
    },
    {
      label: "Generate report",
      icon: "📄",
      onClick: () => router.push("/teacher/reports"),
    },
    {
      label: "Message parent",
      icon: "💬",
      onClick: () => router.push("/teacher/messages"),
    },
    {
      label: "Plan tomorrow",
      icon: "📅",
      onClick: () => router.push("/teacher/calendar"),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={action.onClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            borderRadius: 10,
            background: "#fff",
            border: "1px solid var(--color-border)",
            cursor: "pointer",
            textAlign: "left",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>{action.icon}</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--color-text-dark)",
              lineHeight: 1.2,
            }}
          >
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
}
