import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  label: string;
  subtext?: string;
  accent?: boolean;
}

export function StatCard({ value, label, subtext, accent }: StatCardProps) {
  return (
    <Card
      size="sm"
      className={cn(
        "py-3.5 ring-1",
        accent
          ? "border-transparent bg-primary text-primary-foreground ring-primary/20"
          : "bg-card ring-border/80"
      )}
    >
      <div className="flex flex-col gap-0.5 px-3.5">
        <span
          className={cn(
            "text-[1.625rem] leading-none font-bold tabular-nums tracking-tight",
            accent ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {value}
        </span>
        <span
          className={cn(
            "text-xs font-semibold tracking-wide",
            accent ? "text-primary-foreground/90" : "text-muted-foreground"
          )}
        >
          {label}
        </span>
        {subtext ? (
          <span
            className={cn(
              "mt-0.5 text-[11px] leading-snug",
              accent ? "text-primary-foreground/75" : "text-muted-foreground"
            )}
          >
            {subtext}
          </span>
        ) : null}
      </div>
    </Card>
  );
}
