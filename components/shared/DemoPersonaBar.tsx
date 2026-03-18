"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import type { EmployeeRole } from "@/lib/types";

type DemoRole = "teacher" | "student" | "parent" | "school";

interface DemoPersonaBarProps {
  role: DemoRole;
}

interface Persona {
  id: string;
  label: string;
  sub?: string;
}

const TEACHER_PERSONAS: Persona[] = [
  { id: "emp-siti",  label: "Siti Binte Rahmat", sub: "Kingfisher · K1" },
  { id: "emp-lim",   label: "Lim Wei Ling",       sub: "Sparrow · K2"   },
];

const TEACHER_CLASS_MAP: Record<string, string> = {
  "emp-siti": "class-1",
  "emp-lim":  "class-2",
};

const CHILD_PERSONAS: Persona[] = [
  { id: "child-rayan", label: "Rayan", sub: "K1" },
  { id: "child-amir",  label: "Amir",  sub: "K2" },
];

const PARENT_PERSONAS: Persona[] = [
  { id: "parent-ahmed", label: "Mr Ahmed Al-Rashid", sub: "1 child"    },
  { id: "parent-nur",   label: "Mdm Nur Hassan",     sub: "2 children" },
];

const PARENT_DEFAULT_CHILD: Record<string, string> = {
  "parent-ahmed": "child-rayan",
  "parent-nur":   "child-amir",
};

const SCHOOL_PERSONAS: Persona[] = [
  { id: "org_admin",    label: "Priya Shankar",    sub: "Organisation Admin" },
  { id: "school_admin", label: "David Tan",        sub: "School Admin"       },
];

export function DemoPersonaBar({ role }: DemoPersonaBarProps) {
  const router = useRouter();
  const { demoPersona, setDemoTeacher, setDemoParent, setDemoAdmin, setDemoStudent } = useStore();

  let personas: Persona[];
  let activeId: string;

  switch (role) {
    case "teacher":
      personas = TEACHER_PERSONAS;
      activeId = demoPersona.teacherEmployeeId;
      break;
    case "student":
      personas = CHILD_PERSONAS;
      activeId = demoPersona.studentChildId;
      break;
    case "parent":
      personas = PARENT_PERSONAS;
      activeId = demoPersona.parentId;
      break;
    case "school":
      personas = SCHOOL_PERSONAS;
      activeId = demoPersona.adminRole;
      break;
  }

  function handleSelect(persona: Persona) {
    switch (role) {
      case "teacher": {
        const classId = TEACHER_CLASS_MAP[persona.id] ?? "class-1";
        setDemoTeacher(persona.id, classId);
        router.push("/teacher/class");
        break;
      }
      case "student": {
        setDemoStudent(persona.id);
        router.push(`/student/${persona.id}`);
        break;
      }
      case "parent": {
        setDemoParent(persona.id);
        const defaultChild = PARENT_DEFAULT_CHILD[persona.id];
        router.push(defaultChild ? `/parent/${defaultChild}` : "/parent");
        break;
      }
      case "school": {
        setDemoAdmin(persona.id as EmployeeRole);
        router.push("/school/classes");
        break;
      }
    }
  }

  return (
    <div
      className="flex items-center gap-1.5 px-4 h-10 border-b shrink-0 overflow-x-auto"
      style={{
        background: "var(--color-bg-cream)",
        borderColor: "var(--color-border)",
      }}
    >
      <span
        className="text-[10px] font-semibold tracking-wide uppercase shrink-0 mr-1"
        style={{ color: "var(--color-text-muted)" }}
      >
        Viewing as
      </span>

      {personas.map((persona) => {
        const active = persona.id === activeId;
        return (
          <button
            key={persona.id}
            onClick={() => handleSelect(persona)}
            className="flex items-center gap-1.5 h-7 px-3 rounded-full text-xs font-medium shrink-0 transition-colors"
            style={{
              background: active ? "var(--color-primary)" : "white",
              color: active ? "white" : "var(--color-text-mid)",
              border: active ? "none" : "1px solid var(--color-border)",
            }}
          >
            {persona.label}
            {persona.sub && (
              <span
                className="text-[10px]"
                style={{ opacity: active ? 0.8 : 0.6 }}
              >
                · {persona.sub}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
