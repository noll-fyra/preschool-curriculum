"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function DemoParentPage() {
  const router = useRouter();
  const { studentParentLinks, demoPersona } = useStore();

  useEffect(() => {
    const link = studentParentLinks.find((l) => l.parentId === demoPersona.parentId);
    if (link) {
      router.replace(`/parent/${link.childId}`);
    }
  }, [router, studentParentLinks, demoPersona.parentId]);

  return null;
}
