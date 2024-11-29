export interface Ability {
  id: number;
  name: string;
  duration: number;
  cooldown: number;
  icon: string;
  color1: string;
  color2: string;
}

export interface Job {
  id: number;
  name: string;
  skills: Ability[];
  active: boolean;
}

export interface Segment {
  abilityId: number;
  segmentId: string;
  start: number;
  length: number;
}
