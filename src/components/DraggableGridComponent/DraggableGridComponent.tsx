import {
  DndContext,
  Modifiers,
  PointerActivationConstraint,
  Translate,
} from "@dnd-kit/core";
import { Axis } from "../../globals";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { useState } from "react";
import DraggableItem from "./DraggableItem";
import { Ability, Segment } from "../../types";
import { Coordinates } from "@dnd-kit/core/dist/types";
import { absoluteMousePosition } from "../../App";
import { snapToGridModifier, defaultCoordinates } from "../../globals";

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
  nodes: Segment[];
  setNodes: (arr: Segment[]) => void;
}

interface TranslateState {
  initialTranslate: Translate;
  translate: Translate;
}

export default function DraggableGridComponent({
  axis,
  handle,
  ability,
  style,
  onRightClick,
  entity,
  nodes,
  setNodes,
}: DndContextProps) {
  const [{ translate, initialTranslate }, setTranslate] =
    useState<TranslateState>({
      initialTranslate: { ...defaultCoordinates, x: entity.start * 8 },
      translate: { ...defaultCoordinates, x: entity.start * 8 },
    });

  function checkCollision(coordinates: number): Segment | undefined {
    const dragSegmentStart = coordinates / 8;
    const dragSegmentEnd = dragSegmentStart + entity.length;

    const foundNode = nodes.find(
      (node) =>
        node.start < dragSegmentEnd &&
        dragSegmentStart < node.start + node.length &&
        node.segmentId !== entity.segmentId
    );

    return foundNode;
  }

  function moveToEdge(segment: Segment): void {
    let collisionResult;
    const segmentEnd = segment.start + segment.length;

    if (absoluteMousePosition >= segmentEnd * 8) {
      collisionResult = segmentEnd * 8;
      const newSegment = checkCollision(collisionResult);

      if (!newSegment) {
        setTranslate({
          initialTranslate,
          translate: { ...translate, x: collisionResult },
        });
      }
    } else if (absoluteMousePosition < segment.start * 8) {
      collisionResult = (segment.start - segment.length) * 8;
      const newSegment = checkCollision(collisionResult);
      if (collisionResult <= 8) {
        return;
      }
      if (!newSegment) {
        setTranslate({
          initialTranslate,
          translate: { ...translate, x: collisionResult },
        });
      }
      return;
    }
  }

  function handleDragMove(delta: Coordinates) {
    const translateResult = initialTranslate.x + delta.x;

    const newPosition = checkCollision(translateResult);

    if (newPosition) {
      moveToEdge(newPosition);
    } else {
      if (translateResult <= 8) {
        const zeroPosition = checkCollision(8);
        if (zeroPosition) {
          return;
        }
        setTranslate({ initialTranslate, translate: { ...translate, x: 8 } });
        return;
      }

      setTranslate({
        initialTranslate,
        translate: { ...translate, x: translateResult },
      });
    }
  }

  function updatePosition(): void {
    const updatedNodes = nodes.map((node) => {
      if (node.segmentId == entity.segmentId) {
        return { ...node, start: translate.x / 8 };
      } else {
        return node;
      }
    });

    setNodes(updatedNodes);
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
    updatePosition();
  }

  return (
    <DndContext
      onDragMove={({ delta }) => {
        handleDragMove(delta);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setTranslate(({ initialTranslate }) => ({
          translate: initialTranslate,
          initialTranslate,
        }));
      }}
      modifiers={[snapToGridModifier, restrictToHorizontalAxis]}
    >
      <DraggableItem
        axis={axis}
        handle={handle}
        style={style}
        translate={translate}
        ability={ability}
        onRightClick={onRightClick}
      />
    </DndContext>
  );
}
