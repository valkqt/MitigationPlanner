import {
  DndContext,
  Modifiers,
  PointerActivationConstraint,
  Translate,
} from "@dnd-kit/core";
import { Axis } from "../../enums/Axis";
import {
  createSnapModifier,
  restrictToHorizontalAxis,
} from "@dnd-kit/modifiers";
import { useState } from "react";
import DraggableItem from "./DraggableItem";
import { Ability, Segment } from "../../types";
import { Coordinates } from "@dnd-kit/core/dist/types";

const gridSize = 8; // pixels
const snapToGridModifier = createSnapModifier(gridSize);

const defaultCoordinates = {
  x: 0,
  y: 0,
};

interface DndContextProps {
  activationConstraint?: PointerActivationConstraint;
  axis?: Axis;
  handle?: boolean;
  modifiers?: Modifiers;
  style?: React.CSSProperties;
  label?: string;
  ability: Ability;
  onRightClick: any;
  entity: Segment;
  segments: Segment[];
  setSegments: (arr: Segment[]) => void;
}

interface TranslateState {
  initialTranslate: Translate;
  translate: Translate;
}

export default function DraggableGridComponent({
  // activationConstraint,
  axis,
  handle,
  label = "Go ahead, drag me.",
  // modifiers,
  ability,
  style,
  onRightClick,
  entity,
  segments,
  setSegments,
}: DndContextProps) {
  const [{ translate, initialTranslate }, setTranslate] =
    useState<TranslateState>({
      initialTranslate: { ...defaultCoordinates, x: entity.start * 8 },
      translate: { ...defaultCoordinates, x: entity.start * 8 },
    });

  const [initialWindowScroll, setInitialWindowScroll] =
    useState(defaultCoordinates);

  function resolveCollision(translationResult: number): Segment | undefined {
    return segments.find(
      (seg) =>
        seg.start < translationResult / 8 + entity.length &&
        translationResult / 8 < seg.start + seg.length &&
        seg.segmentId !== entity.segmentId
    );
  }

  function moveDraggableToEdge(segment: Segment): number {
    let newPosition;

    if (translate.x / 8 >= segment.start + segment.length) {
      newPosition = (segment.start + segment.length) * 8;
      let newSegment = resolveCollision(newPosition);
      if (newSegment) {
        return translate.x;
      }
    } else {
      newPosition = (segment.start - entity.length) * 8;
      let newSegment = resolveCollision(newPosition);
      if (newSegment) {
        return translate.x;
      }
    }
    return newPosition;
  }

  function handleDragMove(delta: Coordinates) {
    let translateResult = initialTranslate.x + delta.x;
    let newPosition = resolveCollision(translateResult);

    if (newPosition) {
      setTranslate({
        initialTranslate,
        translate: {
          ...translate,
          x: moveDraggableToEdge(newPosition),
        },
      });
    } else {
      setTranslate({
        initialTranslate,
        translate: {
          ...translate,
          x: translateResult > 8 ? translateResult : 8 - initialWindowScroll.x,
        },
      });
    }
  }

  function handleDragEnd() {
    if (translate.x >= 0) {
      setTranslate(({ translate }) => {
        return {
          translate,
          initialTranslate: translate,
        };
      });
    } else {
      setTranslate(({ translate }) => {
        return {
          translate: { x: 0, y: translate.y },
          initialTranslate: { x: 0, y: translate.y },
        };
      });
    }

    const segs = segments.map((s) => {
      if (s.segmentId == entity.segmentId) {
        return { ...s, start: translate.x / 8 };
      } else {
        return s;
      }
    });

    setSegments(segs);

    setInitialWindowScroll(defaultCoordinates);
  }

  return (
    <DndContext
      onDragStart={() => {
        setInitialWindowScroll({
          x: window.scrollX,
          y: window.scrollY,
        });
      }}
      onDragMove={({ delta }) => handleDragMove(delta)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setTranslate(({ initialTranslate }) => ({
          translate: initialTranslate,
          initialTranslate,
        }));
        setInitialWindowScroll(defaultCoordinates);
      }}
      modifiers={[snapToGridModifier, restrictToHorizontalAxis]}
    >
      <DraggableItem
        axis={axis}
        label={label}
        handle={handle}
        style={style}
        translate={translate}
        ability={ability}
        onRightClick={onRightClick}
      />
    </DndContext>
  );
}
