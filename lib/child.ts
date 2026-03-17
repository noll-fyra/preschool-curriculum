import type { Child } from "./types";

/** Age in whole years from dateOfBirth (undefined if no DOB or invalid). */
export function getChildAgeInYears(child: Child, now: Date = new Date()): number | undefined {
  if (!child.dateOfBirth) return undefined;
  const dob = new Date(child.dateOfBirth);
  if (Number.isNaN(dob.getTime())) return undefined;
  let years = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  const dayDiff = now.getDate() - dob.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) years -= 1;
  return years < 0 ? undefined : years;
}

export function getChildAgeLabel(child: Child, now: Date = new Date()): string | undefined {
  if (!child.dateOfBirth) return undefined;

  const dob = new Date(child.dateOfBirth);
  if (Number.isNaN(dob.getTime())) return undefined;

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  const dayDiff = now.getDate() - dob.getDate();

  if (dayDiff < 0) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 0) return undefined;

  return months > 0 ? `${years}y ${months}m` : `${years}y`;
}

