import { RubricView } from "@/components/shared/RubricView";
import { Card, CardContent } from "@/components/ui/card";

export default function TeacherRubricPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-6">
      <div className="mb-6">
        <h1 className="mb-1 text-xl font-semibold text-foreground">
          Rubric Reference
        </h1>
        <p className="text-muted-foreground text-sm">
          Observable criteria for all 6 NEL learning areas across Beginning, Developing, and Secure levels. Use this as a guide when observing children and recording progress.
        </p>
      </div>
      <Card className="shadow-none">
        <CardContent className="pt-4">
          <RubricView />
        </CardContent>
      </Card>
    </div>
  );
}
