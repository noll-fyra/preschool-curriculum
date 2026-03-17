import type { Gender, Pronoun } from "./types";

export function getChildDisplayName(child: {
  firstName: string;
  lastName: string;
}): string {
  return [child.firstName, child.lastName].filter(Boolean).join(" ").trim() || "—";
}

export function getTeacherDisplayName(teacher: {
  firstName: string;
  lastName: string;
}): string {
  return [teacher.firstName, teacher.lastName].filter(Boolean).join(" ").trim() || "—";
}

/** Derive pronoun from gender for grammar in copy (he/she/they). */
export function getPronounFromGender(gender: Gender): Pronoun {
  switch (gender) {
    case "male":
      return "he";
    case "female":
      return "she";
    default:
      return "they";
  }
}
