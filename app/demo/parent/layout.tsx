"use client";

import ParentLayout from "@/app/parent/layout";

export default function DemoParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ParentLayout>{children}</ParentLayout>;
}

