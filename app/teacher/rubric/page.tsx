import { RubricView } from "@/components/shared/RubricView";

export default function TeacherRubricPage() {
  return (
    <div className="px-5 py-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1
          className="text-xl font-semibold mb-1"
          style={{ color: "var(--color-text-dark)" }}
        >
          Rubric Reference
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text-mid)" }}>
          Observable criteria for all 6 NEL learning areas across Beginning, Developing, and Secure levels. Use this as a guide when observing children and recording progress.
        </p>
      </div>
      <RubricView />
    </div>
  );
}
