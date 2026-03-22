import { Card, CardContent } from "@/components/ui/card";

export function DashboardSectionCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="min-w-0 shadow-none">
      <CardContent className="min-w-0 pt-0">{children}</CardContent>
    </Card>
  );
}
