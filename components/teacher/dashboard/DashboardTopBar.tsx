"use client";

import { useId } from "react";
import { Bell, Plus } from "lucide-react";

import type { Class } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DashboardTopBarProps {
  teacherName: string;
  today: Date;
  classes: Class[];
  activeClassId: string;
  onClassChange: (classId: string) => void;
  onQuickLogOpen: () => void;
  onNotificationsOpen?: () => void;
  notificationCount?: number;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(d: Date): string {
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}


export function DashboardTopBar({
  teacherName,
  today,
  classes,
  activeClassId,
  onClassChange,
  onQuickLogOpen,
  onNotificationsOpen,
  notificationCount = 0,
}: DashboardTopBarProps) {
  const classPickerId = useId();
  const classItems = Object.fromEntries(
    classes.map((c) => [c.id, `${c.name} (${c.preschoolYear})`])
  );

  return (
    <header className="flex shrink-0 items-center gap-3 border-b bg-card px-4 py-3 sm:px-5 md:gap-4">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-foreground">{teacherName}</p>
        <p className="text-xs text-muted-foreground">{formatDate(today)}</p>
      </div>

      <div className="shrink-0">
        <Select
          id={classPickerId}
          value={activeClassId}
          onValueChange={(v) => {
            if (v != null) onClassChange(String(v));
          }}
          items={classItems}
        >
          <SelectTrigger className="h-9 min-w-[min(100vw-12rem,220px)] font-semibold sm:min-w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {classes.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name} ({c.preschoolYear})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2">
        {onNotificationsOpen && (
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="relative shrink-0"
            onClick={onNotificationsOpen}
            aria-label="Open notifications"
          >
            <Bell className="size-4" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className={cn(
                  "absolute -top-1.5 -right-1.5 h-4 min-w-4 justify-center rounded-full px-1 py-0 text-[10px] font-bold tabular-nums",
                  notificationCount > 9 && "px-1.5"
                )}
              >
                {notificationCount > 9 ? "9+" : notificationCount}
              </Badge>
            )}
          </Button>
        )}

        <Button
          type="button"
          size="sm"
          className="hidden gap-1.5 font-semibold sm:inline-flex"
          onClick={onQuickLogOpen}
        >
          <Plus className="size-3.5" strokeWidth={2.5} />
          Log observation
        </Button>
        <Button
          type="button"
          size="icon-sm"
          className="sm:hidden"
          onClick={onQuickLogOpen}
          aria-label="Log observation"
        >
          <Plus className="size-4" strokeWidth={2.5} />
        </Button>
      </div>
    </header>
  );
}
