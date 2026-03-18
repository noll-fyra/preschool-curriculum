import type {
  Child,
  Milestone,
  ChildMilestoneProgress,
  ActivitySession,
  TeacherObservation,
  LearningAreaId,
  LevelId,
} from "./types";
import { LEARNING_AREAS, LEVEL_LABELS } from "./types";
import { getChildDisplayName, getPronounFromGender } from "./display-name";
import { getCurrentLevel, evaluateSkillMastery, evaluateSEDMastery } from "./mastery";

const LEVEL_DESCRIPTIONS: Record<LevelId, string> = {
  B: "Beginning",
  D: "Developing",
  S: "Secure",
};

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateReportDraft(
  childId: string,
  children: Child[],
  milestones: Milestone[],
  progress: ChildMilestoneProgress[],
  sessions: ActivitySession[],
  observations: TeacherObservation[]
): string {
  const child = children.find((c) => c.id === childId);
  if (!child) return "";

  const name = getChildDisplayName(child);
  const he = getPronounFromGender(child.gender);
  const his = he === "they" ? "their" : he === "he" ? "his" : "her";
  const Him = he === "they" ? "They" : he === "he" ? "He" : "She";

  const levelPerArea: Record<LearningAreaId, LevelId> = {
    LL: getCurrentLevel(milestones, progress, childId, "LL"),
    NUM: getCurrentLevel(milestones, progress, childId, "NUM"),
    SED: getCurrentLevel(milestones, progress, childId, "SED"),
    ACE: getCurrentLevel(milestones, progress, childId, "ACE"),
    DOW: getCurrentLevel(milestones, progress, childId, "DOW"),
    HMS: getCurrentLevel(milestones, progress, childId, "HMS"),
  };

  // ─── Para 1: current level summary ──────────────────────────────────
  const para1 =
    `${name} has been working across Language & Literacy, Numeracy, and Social & Emotional Development this term. ` +
    `${Him} is currently at the ${LEVEL_DESCRIPTIONS[levelPerArea.LL]} stage in Language & Literacy, ` +
    `the ${LEVEL_DESCRIPTIONS[levelPerArea.NUM]} stage in Numeracy, and ` +
    `the ${LEVEL_DESCRIPTIONS[levelPerArea.SED]} stage in Social & Emotional Development.`;

  // ─── Para 2: Language & Literacy ────────────────────────────────────
  const llAchieved = milestones.filter(
    (m) =>
      m.areaId === "LL" &&
      evaluateSkillMastery(sessions, childId, m.id) === "achieved"
  );
  const llInProgress = milestones.filter(
    (m) =>
      m.areaId === "LL" &&
      evaluateSkillMastery(sessions, childId, m.id) === "in_progress"
  );

  let para2 = `In Language & Literacy, `;
  if (llAchieved.length > 0) {
    para2 += `${name} has successfully demonstrated the following skills: `;
    para2 += llAchieved
      .map((m) => m.statement.toLowerCase())
      .join("; ") + ". ";
  } else {
    para2 += `${name} is in the early stages of building literacy skills. `;
  }
  if (llInProgress.length > 0) {
    para2 += `${Him} is currently building towards: `;
    para2 += llInProgress.map((m) => m.statement.toLowerCase()).join("; ") + ".";
  }

  // ─── Para 3: Numeracy ────────────────────────────────────────────────
  const numAchieved = milestones.filter(
    (m) =>
      m.areaId === "NUM" &&
      evaluateSkillMastery(sessions, childId, m.id) === "achieved"
  );
  const numInProgress = milestones.filter(
    (m) =>
      m.areaId === "NUM" &&
      evaluateSkillMastery(sessions, childId, m.id) === "in_progress"
  );

  let para3 = `In Numeracy, `;
  if (numAchieved.length > 0) {
    para3 += `${name} has successfully demonstrated: `;
    para3 += numAchieved
      .map((m) => m.statement.toLowerCase())
      .join("; ") + ". ";
  } else {
    para3 += `${name} is building foundational number concepts. `;
  }
  if (numInProgress.length > 0) {
    para3 += `${Him} is currently working on: `;
    para3 += numInProgress
      .map((m) => m.statement.toLowerCase())
      .join("; ") + ".";
  }

  // ─── Para 4: Social & Emotional Development ──────────────────────────
  const sedAchieved = milestones.filter(
    (m) =>
      m.areaId === "SED" &&
      evaluateSEDMastery(observations, childId, m.id) === "achieved"
  );
  const sedInProgress = milestones.filter(
    (m) =>
      m.areaId === "SED" &&
      evaluateSEDMastery(observations, childId, m.id) === "in_progress"
  );

  let para4 = `In Social & Emotional Development, `;
  if (sedAchieved.length > 0) {
    para4 +=
      `${name} has consistently demonstrated: ` +
      sedAchieved.map((m) => m.statement.toLowerCase()).join("; ") +
      ". ";
  } else {
    para4 += `${name} is beginning to develop social and emotional skills. `;
  }
  if (sedInProgress.length > 0) {
    para4 += `${Him} is currently building towards: `;
    para4 += sedInProgress.map((m) => {
      const obsCount = new Set(
        observations
          .filter(
            (o) => o.childId === childId && o.milestoneId === m.id
          )
          .map((o) => o.observedAt)
      ).size;
      return `${m.statement.toLowerCase()} (${obsCount} of 5 observations recorded)`;
    }).join("; ") + ".";
  }

  // ─── Para 5: Forward look ────────────────────────────────────────────
  const nextLL = milestones.find(
    (m) =>
      m.areaId === "LL" &&
      m.levelId === levelPerArea.LL &&
      evaluateSkillMastery(sessions, childId, m.id) !== "achieved"
  );
  const nextNUM = milestones.find(
    (m) =>
      m.areaId === "NUM" &&
      m.levelId === levelPerArea.NUM &&
      evaluateSkillMastery(sessions, childId, m.id) !== "achieved"
  );

  let para5 = `Looking ahead, `;
  const nextItems: string[] = [];
  if (nextLL) nextItems.push(`continuing to develop ${nextLL.statement.toLowerCase()} in Language & Literacy`);
  if (nextNUM) nextItems.push(`building towards ${nextNUM.statement.toLowerCase()} in Numeracy`);

  if (nextItems.length > 0) {
    para5 += `${name} will focus on ` + nextItems.join(", ") + `. `;
  }

  const allSecure =
    levelPerArea.LL === "S" &&
    levelPerArea.NUM === "S" &&
    levelPerArea.SED === "S";

  if (allSecure) {
    para5 +=
      `${name} has achieved Secure level across all learning areas and is well on track for Primary 1.`;
  } else {
    para5 +=
      `With continued support at home and school, ${name} is making good progress towards ${his} learning goals.`;
  }

  // Suppress unused imports
  void LEARNING_AREAS;
  void LEVEL_LABELS;
  void cap;

  return [para1, para2, para3, para4, para5].join("\n\n");
}
