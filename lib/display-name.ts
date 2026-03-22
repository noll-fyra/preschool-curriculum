import type { Gender, Pronoun } from "./types";

export function getChildDisplayName(child: {
  firstName: string;
  lastName: string;
}): string {
  return [child.firstName, child.lastName].filter(Boolean).join(" ").trim() || "—";
}

/** Up to two letters for avatar chips; avoids "undefined" when lastName is empty. */
export function getChildInitials(child: { firstName: string; lastName: string }): string {
  const first = child.firstName.trim();
  const last = child.lastName.trim();
  const a = first.charAt(0);
  const b = last.charAt(0);
  if (a && b) return `${a}${b}`.toUpperCase();
  if (first.length >= 2) return first.slice(0, 2).toUpperCase();
  return (a || "?").toUpperCase();
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
