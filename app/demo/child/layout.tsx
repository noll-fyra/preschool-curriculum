"use client";

import StudentLayout from "@/app/student/layout";

export default function DemoChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StudentLayout>{children}</StudentLayout>;
}

