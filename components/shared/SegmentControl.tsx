"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SegmentControl<T extends string>({
  value,
  onChange,
  options,
  className,
  scrollable,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string }[];
  className?: string;
  /** When true, allows horizontal scroll on narrow screens (e.g. 4+ tabs). */
  scrollable?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "bg-muted flex gap-1 rounded-xl p-1",
        scrollable ? "w-max min-w-full" : "w-full"
      )}
    >
      {options.map((t) => (
        <Button
          key={t.id}
          type="button"
          variant={value === t.id ? "default" : "ghost"}
          size="sm"
          className={cn(
            "shadow-none whitespace-nowrap",
            scrollable ? "shrink-0" : "flex-1",
            value !== t.id && "text-muted-foreground"
          )}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );

  if (scrollable) {
    return (
      <div className={cn("mb-6 overflow-x-auto", className)}>{inner}</div>
    );
  }

  return <div className={cn("mb-6 w-full", className)}>{inner}</div>;
}
