import { createSnapModifier } from "@dnd-kit/modifiers";

export const gridSize = 8;
export const defaultCoordinates = {
  x: 0,
  y: 0,
};

export const snapToGridModifier = createSnapModifier(gridSize);
