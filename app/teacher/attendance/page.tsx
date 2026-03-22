import { AttendanceTab } from "@/components/shared/AttendanceTab";

export default function TeacherAttendancePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 pb-24 md:pb-8">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground mt-0.5 text-sm">
          Mark attendance and track absences for your class.
        </p>
      </div>
      <AttendanceTab mode="teacher" />
    </div>
  );
}
