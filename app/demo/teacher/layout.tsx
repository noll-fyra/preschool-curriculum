"use client";

import TeacherLayout from "@/app/teacher/layout";

export default function DemoTeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TeacherLayout>{children}</TeacherLayout>;
}

