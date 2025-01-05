import { createSnapModifier } from "@dnd-kit/modifiers";
import { Encounter, GlobalFlags, EnemySkill, Source } from "./types";

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

export enum SkillTarget {
  Self = "Self",
  Single = "Single",
  Raid = "Raid",
}

export enum PlayerSkillType {
  Mitigation = "Mitigation",
  Healing = "Healing",
  Other = "Other",
}

export enum EnemySkillType {
  Setup,
  Damage,
  Enrage,
  Other,
}

export enum DamageType {
  Physical,
  Magical,
  Darkness,
  Misc,
  None,
}

export const snapToGridModifier = createSnapModifier(gridSize);

const sageSkills = [
  {
    id: 1,
    name: "Holos",
    duration: 20,
    cooldown: 120,
    target: SkillTarget.Raid,
    type: PlayerSkillType.Mitigation,
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
    target: SkillTarget.Single,
    type: PlayerSkillType.Healing,
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
    target: SkillTarget.Raid,
    type: PlayerSkillType.Mitigation,
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
    target: SkillTarget.Raid,
    type: PlayerSkillType.Healing,
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
    target: SkillTarget.Raid,
    type: PlayerSkillType.Mitigation,
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
    target: SkillTarget.Raid,
    type: PlayerSkillType.Healing,
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
    target: SkillTarget.Self,
    type: PlayerSkillType.Other,
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
    target: SkillTarget.Self,
    type: PlayerSkillType.Healing,
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
    target: SkillTarget.Single,
    type: PlayerSkillType.Mitigation,
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
    target: SkillTarget.Raid,
    type: PlayerSkillType.Healing,
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
    target: SkillTarget.Raid,
    type: PlayerSkillType.Mitigation,
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
    target: SkillTarget.Raid,
    type: PlayerSkillType.Mitigation,
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
    target: SkillTarget.Raid,
    type: PlayerSkillType.Mitigation,
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
  target: { Single: false, Raid: true, Self: false },
  type: { Healing: false, Mitigation: true, Other: false },
  level: maxLevel,
};

export const e8sMechanics: EnemySkill[] = [
  {
    id: 1000,
    name: "Absolute Zero",
    source: Source.Boss,
    target: SkillTarget.Raid,
    type: EnemySkillType.Damage,
    damageType: DamageType.Magical,
    castTime: 4,
    icon: "",
    color1: "gray",
    color2: "",
  },
  {
    id: 1001,
    name: "Mirror Mirror",
    source: Source.Boss,
    target: SkillTarget.Self,
    type: EnemySkillType.Setup,
    damageType: DamageType.None,
    castTime: 5,
    icon: "",
    color1: "gray",
    color2: "",
  },
  {
    id: 1002,
    name: "Biting Frost / Driving Frost",
    type: EnemySkillType.Damage,
    source: Source.Boss,
    target: SkillTarget.Raid,
    damageType: DamageType.Magical,
    castTime: 5,
    icon: "",
    color1: "gray",
    color2: "",
  },
  {
    id: 1003,
    name: "Reflected Biting/Driving Frost #1",
    source: Source.Enemy,
    target: SkillTarget.Raid,
    type: EnemySkillType.Damage,
    damageType: DamageType.Magical,
    castTime: 5,
    icon: "",
    color1: "gray",
    color2: "",
  },
  {
    id: 1004,
    name: "Reflected Biting/Driving Frost #2",
    source: Source.Enemy,
    target: SkillTarget.Raid,
    type: EnemySkillType.Damage,
    damageType: DamageType.Magical,
    castTime: 5,
    icon: "",
    color1: "gray",
    color2: "",
  },

  {
    id: 1005,
    name: "Diamond Frost",
    source: Source.Enemy,
    target: SkillTarget.Raid,
    type: EnemySkillType.Damage,
    damageType: DamageType.Magical,
    castTime: 4,
    icon: "",
    color1: "gray",
    color2: "",
  },
];

export const encounters: Encounter[] = [
  {
    name: "Eden's Verse: Refulgence",
    level: 80,
    duration: 838,
    nodes: [
      { id: 1, timestamp: 10, duration: 13, mechanic: e8sMechanics[0] },
      { id: 2, timestamp: 23, duration: 10, mechanic: e8sMechanics[1] },
      { id: 3, timestamp: 33, duration: 10, mechanic: e8sMechanics[2] },
      { id: 4, timestamp: 43, duration: 5, mechanic: e8sMechanics[3] },
      { id: 5, timestamp: 48, duration: 10, mechanic: e8sMechanics[4] },
      { id: 6, timestamp: 58, duration: 10, mechanic: e8sMechanics[5] },
    ],
  },
];
