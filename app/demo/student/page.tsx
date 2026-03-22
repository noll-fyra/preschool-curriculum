"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DemoStudentIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/demo/child");
  }, [router]);

  return null;
}

