"use client";

import StudentLayout from "@/app/student/layout";

export default function DemoStudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentLayout>{children}</StudentLayout>;
}

