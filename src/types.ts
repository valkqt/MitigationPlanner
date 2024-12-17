import { AbilityType, Target } from "./globals";

export interface Ability {
  id: number;
  name: string;
  duration: number;
  cooldown: number;
  target: Target;
  type: AbilityType;
  icon: string;
  color1: string;
  color2: string;
}

export interface Job {
  id: number;
  name: string;
  skills: Ability[];
  icon: string;
}

export interface Segment {
  abilityId: number;
  segmentId: string;
  start: number;
  length: number;
}

export interface Mechanic {
  name: string;
  start: number;
  duration: number;
}

export interface Encounter {
  name: string;
  duration: number;
  nodes: Mechanic[];
}

export interface GlobalFlags {
  jobs: Record<number, boolean>;
  abilities: Record<number, boolean>;
  target: Record<string, boolean>;
  type: Record<string, boolean>;
}
