export interface Ability {
  id: number;
  name: string;
  duration: number;
  cooldown: number;
  icon: string;
  color1: string;
  color2: string;
  active: boolean;
}

export interface Job {
  id: number;
  name: string;
  skills: Ability[];
  active: boolean;
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
