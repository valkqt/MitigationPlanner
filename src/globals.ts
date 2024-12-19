import { createSnapModifier } from "@dnd-kit/modifiers";
import { GlobalFlags } from "./types";

export const gridSize = 8;
export const defaultCoordinates = {
  x: 0,
  y: 0,
};

export const maxLevel = 100;
export const levelArray: number[] = Array.from(
  { length: maxLevel / 10 - 4 },
  (_, index) => {
    return 50 + index * 10;
  }
);

export enum Axis {
  All,
  Vertical,
  Horizontal,
}

export enum Target {
  Self = "Self",
  Single = "Single",
  Party = "Party",
}

export enum AbilityType {
  Mitigation = "Mitigation",
  Healing = "Healing",
  Other = "Other",
}

export const snapToGridModifier = createSnapModifier(gridSize);

const sageSkills = [
  {
    id: 1,
    name: "Holos",
    duration: 20,
    cooldown: 120,
    target: Target.Party,
    type: AbilityType.Mitigation,
    level: 76,
    icon: "./icons/SGE/holos.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 2,
    name: "Krasis",
    duration: 15,
    cooldown: 60,
    target: Target.Single,
    type: AbilityType.Healing,
    level: 86,
    icon: "./icons/SGE/krasis.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 3,
    name: "Panhaima",
    duration: 15,
    cooldown: 120,
    target: Target.Party,
    type: AbilityType.Mitigation,
    level: 80,
    icon: "./icons/SGE/panhaima.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 4,
    name: "Physis",
    duration: 15,
    cooldown: 60,
    target: Target.Party,
    type: AbilityType.Healing,
    level: 20,
    icon: "./icons/SGE/physis_II.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 5,
    name: "Kerachole",
    duration: 15,
    cooldown: 30,
    target: Target.Party,
    type: AbilityType.Mitigation,
    level: 50,
    icon: "./icons/SGE/kerachole.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 6,
    name: "Pneuma",
    duration: 0,
    cooldown: 120,
    target: Target.Party,
    type: AbilityType.Healing,
    level: 90,
    icon: "./icons/SGE/pneuma.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 7,
    name: "Zoe",
    duration: 30,
    cooldown: 90,
    target: Target.Self,
    type: AbilityType.Other,
    level: 56,
    icon: "./icons/SGE/zoe.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 8,
    name: "Soteria",
    duration: 15,
    cooldown: 60,
    target: Target.Self,
    type: AbilityType.Healing,
    level: 35,
    icon: "./icons/SGE/soteria.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 9,
    name: "Haima",
    duration: 15,
    cooldown: 120,
    target: Target.Single,
    type: AbilityType.Mitigation,
    level: 70,
    icon: "./icons/SGE/haima.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
  {
    id: 10,
    name: "Philosophia",
    duration: 20,
    cooldown: 180,
    target: Target.Party,
    type: AbilityType.Healing,
    level: 100,
    icon: "./icons/SGE/philosophia.png",
    color1: "#60cdb2",
    color2: "#08453f",
  },
];
const whmSkills = [
  {
    id: 200,
    name: "Temperance",
    duration: 20,
    cooldown: 120,
    target: Target.Party,
    type: AbilityType.Mitigation,
    level: 20,
    icon: "./icons/WHM_temperance.png",
    color1: "white",
    color2: "white",
    active: true,
  },
];
const schSkills = [
  {
    id: 300,
    name: "Expedience",
    duration: 15,
    cooldown: 120,
    target: Target.Party,
    type: AbilityType.Mitigation,
    level: 20,
    icon: "./icons/SCH_expedient.png",
    color1: "white",
    color2: "white",
    active: true,
  },
];
const astSkills = [
  {
    id: 400,
    name: "Collective Unconscious",
    duration: 15,
    cooldown: 30,
    target: Target.Party,
    type: AbilityType.Mitigation,
    level: 20,
    icon: "./icons/AST_collective_unconscious.png",
    color1: "white",
    color2: "white",
    active: true,
  },
];

export const databaseJobs = [
  {
    id: 1,
    name: "Sage",
    skills: sageSkills,
    icon: "./transparent_icons/sage.png",
  },
  {
    id: 2,
    name: "White Mage",
    skills: whmSkills,
    icon: "./transparent_icons/whitemage.png",
  },
  {
    id: 3,
    name: "Scholar",
    skills: schSkills,
    icon: "./transparent_icons/scholar.png",
  },
  {
    id: 4,
    name: "Astrologian",
    skills: astSkills,
    icon: "./transparent_icons/astrologian.png",
  },
];

export const defaultFlags: GlobalFlags = {
  jobs: { 1: true, 2: false, 3: false, 4: false },
  abilities: {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    10: true,
    200: true,
    300: true,
    400: true,
  },
  target: { Single: false, Party: true, Self: false },
  type: { Healing: false, Mitigation: true, Other: false },
  level: maxLevel,
};

export const encounter = {
  name: "The Omega Protocol",
  duration: 1200,
  nodes: [{ name: "Looper", start: 20, duration: 5 }],
};
