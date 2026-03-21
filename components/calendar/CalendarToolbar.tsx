"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { CalendarView } from "@/lib/calendar-utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CalendarToolbar({
  calView,
  setCalView,
  periodLabel,
  onPrev,
  onNext,
  showToday,
  onToday,
  compact = false,
}: {
  calView: CalendarView;
  setCalView: (v: CalendarView) => void;
  periodLabel: string;
  onPrev: () => void;
  onNext: () => void;
  showToday: boolean;
  onToday: () => void;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex shrink-0 flex-wrap items-center",
        compact ? "gap-2" : "gap-3"
      )}
    >
      <div
        className={cn(
          "bg-muted flex gap-0.5 rounded-xl p-1",
          compact ? "p-0.5" : "p-1"
        )}
      >
        {(["month", "week", "day"] as CalendarView[]).map((v) => (
          <Button
            key={v}
            type="button"
            variant={calView === v ? "default" : "ghost"}
            size={compact ? "xs" : "sm"}
            className="flex-1 capitalize shadow-none"
            onClick={() => setCalView(v)}
          >
            {v}
          </Button>
        ))}
      </div>

      <div
        className={cn(
          "flex items-center gap-0.5",
          compact && "flex-1 justify-center"
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onPrev}
          aria-label="Previous"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span
          className="px-2 text-center text-sm font-semibold text-foreground"
          style={{ minWidth: compact ? 160 : 200 }}
        >
          {periodLabel}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onNext}
          aria-label="Next"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {showToday && (
        <Button
          type="button"
          variant="secondary"
          size={compact ? "xs" : "sm"}
          onClick={onToday}
        >
          Today
        </Button>
      )}
    </div>
  );
}
