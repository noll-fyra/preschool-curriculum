import type { LearningAreaId } from "./types";

export interface Place {
  id: string;
  name: string;
  emoji: string;
  areaId: LearningAreaId;
  /** Border / accent colour */
  color: string;
  /** Card background */
  bg: string;
  /** Character greeting when entering the place */
  greeting: string;
}

export const PLACES: Place[] = [
  {
    id: "reading-nook",
    name: "The Reading Nook",
    emoji: "📚",
    areaId: "LL",
    color: "#F5A623",
    bg: "#FFF8EC",
    greeting: "Welcome to the Reading Nook! There are stories and letters waiting for you here.",
  },
  {
    id: "number-garden",
    name: "The Number Garden",
    emoji: "🌱",
    areaId: "NUM",
    color: "#7DC873",
    bg: "#F0FAF0",
    greeting: "Welcome to the Number Garden! Let's count, sort, and discover numbers together.",
  },
  {
    id: "feelings-corner",
    name: "The Feelings Corner",
    emoji: "🪴",
    areaId: "SED",
    color: "#B89FE8",
    bg: "#F5F0FF",
    greeting: "Welcome to the Feelings Corner! This is a cosy space to explore how we feel.",
  },
  {
    id: "making-studio",
    name: "The Making Studio",
    emoji: "🎨",
    areaId: "ACE",
    color: "#E8745A",
    bg: "#FFF0EC",
    greeting: "Welcome to the Making Studio! You can create anything you like here.",
  },
  {
    id: "discovery-patch",
    name: "The Discovery Patch",
    emoji: "🔭",
    areaId: "DOW",
    color: "#7BA3D4",
    bg: "#EEF4FC",
    greeting: "Welcome to the Discovery Patch! Let's explore and find out how things work.",
  },
  {
    id: "movement-yard",
    name: "The Movement Yard",
    emoji: "🏃",
    areaId: "HMS",
    color: "#F5C518",
    bg: "#FFFBEC",
    greeting: "Welcome to the Movement Yard! Time to move, build, and play.",
  },
];

export function getPlaceById(id: string): Place | undefined {
  return PLACES.find((p) => p.id === id);
}

export function getPlaceByAreaId(areaId: LearningAreaId): Place | undefined {
  return PLACES.find((p) => p.areaId === areaId);
}
