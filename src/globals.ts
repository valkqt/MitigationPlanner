import { createSnapModifier } from "@dnd-kit/modifiers";

export const gridSize = 8;
export const defaultCoordinates = {
  x: 0,
  y: 0,
};

export const snapToGridModifier = createSnapModifier(gridSize);

export const databaseJobs = [
  {
    id: 0,
    name: "sge",
    skills: [
      {
        id: 1,
        name: "Holos",
        duration: 20,
        cooldown: 120,
        icon: "./icons/SGE_holos.png",
        color1: "#60cdb2",
        color2: "#08453f",
        active: true,
      },
    ],
    icon: "./transparent_icons/sage.png",
    active: true,
  },
  {
    id: 1,
    name: "whm",
    skills: [
      {
        id: 2,
        name: "Temperance",
        duration: 20,
        cooldown: 120,
        icon: "./icons/WHM_temperance.png",
        color1: "white",
        color2: "white",
        active: true,
      },
    ],
    icon: "./transparent_icons/whitemage.png",
    active: true,
  },
  {
    id: 2,
    name: "sch",
    skills: [
      {
        id: 3,
        name: "Expedience",
        duration: 15,
        cooldown: 120,
        icon: "./icons/SCH_expedient.png",
        color1: "white",
        color2: "white",
        active: true,
      },
    ],
    icon: "./transparent_icons/scholar.png",
    active: true,
  },
  {
    id: 3,
    name: "ast",
    skills: [
      {
        id: 4,
        name: "Collective Unconscious",
        duration: 15,
        cooldown: 30,
        icon: "./icons/AST_collective_unconscious.png",
        color1: "white",
        color2: "white",
        active: true,
      },
    ],
    icon: "./transparent_icons/astrologian.png",
    active: true,
  },
];

export const encounter = {
  name: "The Omega Protocol",
  duration: 1200,
  nodes: [{ name: "Looper", start: 20, duration: 5 }],
};
