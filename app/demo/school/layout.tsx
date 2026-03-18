"use client";

import SchoolLayout from "@/app/school/layout";

export default function DemoSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SchoolLayout>{children}</SchoolLayout>;
}
