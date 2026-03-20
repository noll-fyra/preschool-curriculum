"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function DemoStudentIndexPage() {
  const router = useRouter();
  const studentChildId = useStore((s) => s.demoPersona.studentChildId);

  useEffect(() => {
    router.replace(`/student/${studentChildId}`);
  }, [router, studentChildId]);

  return null;
}

