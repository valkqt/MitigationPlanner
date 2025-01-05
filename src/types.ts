import {
  DamageType,
  EnemySkillType,
  PlayerSkillType,
  SkillTarget,
} from "./globals";

export interface Job {
  id: number;
  name: string;
  skills: PlayerSkill[];
  icon: string;
}

export interface Segment {
  abilityId: number;
  segmentId: string;
  start: number;
  length: number;
}

export enum Source {
  Ally,
  Boss,
  Enemy,
}

export interface EnemySkill {
  id: number;
  name: string;
  source: Source;
  castTime: number;
  target: SkillTarget;
  type: EnemySkillType;
  damageType: DamageType;
  icon: string;
  color1: string;
  color2: string;
}

export interface PlayerSkill {
  id: number;
  name: string;
  level: number;
  cooldown: number;
  duration: number;
  target: SkillTarget;
  type: PlayerSkillType;
  icon: string;
  color1: string;
  color2: string;
}

export interface Timeline {
  id: number;
  timestamp: number;
  duration: number;
  mechanic: EnemySkill;
}

export interface Encounter {
  name: string;
  level: number;
  duration: number;
  nodes: Timeline[];
}

export interface GlobalFlags {
  jobs: Record<number, boolean>;
  abilities: Record<number, boolean>;
  target: Record<string, boolean>;
  type: Record<string, boolean>;
  level: number;
}
