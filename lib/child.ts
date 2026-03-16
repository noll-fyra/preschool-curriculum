import type { Child } from "./types";

export function getChildAgeLabel(child: Child, now: Date = new Date()): string | undefined {
  if (!child.dateOfBirth) return undefined;

  const dob = new Date(child.dateOfBirth);
  if (Number.isNaN(dob.getTime())) return undefined;

  let years = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  const dayDiff = now.getDate() - dob.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years -= 1;
  }

  if (years < 0) return undefined;

  return years === 1 ? "1 year old" : `${years} years old`;
}

