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
import { forwardRef, MutableRefObject, useState } from "react";
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

export const DraggableGridComponent = forwardRef<number, DndContextProps>(
  function DraggableGridComponent(
    {
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
    },
    ref
  ) {
    const [{ translate, initialTranslate }, setTranslate] =
      useState<TranslateState>({
        initialTranslate: { ...defaultCoordinates, x: entity.start * 8 },
        translate: { ...defaultCoordinates, x: entity.start * 8 },
      });

    const [initialWindowScroll, setInitialWindowScroll] =
      useState(defaultCoordinates);

    const mouseOverRef = ref as MutableRefObject<number>;

    function resolveCollision(translationResult: number): Segment | undefined {
      if (translationResult < 0) {
        return;
      }

      return segments.find(
        (seg) =>
          seg.start < translationResult / 8 + entity.length &&
          translationResult / 8 < seg.start + seg.length &&
          seg.segmentId !== entity.segmentId
      );
    }

    function moveDraggableToEdge(segment: Segment): number {
      let newPosition;
      let mousePosition = mouseOverRef.current * 8;
      const segmentEnd = segment.start + segment.length;

      if (mousePosition >= segmentEnd * 8) {
        newPosition = segmentEnd * 8;
        let newSegment = resolveCollision(newPosition);
        if (newSegment) {
          return translate.x;
        }
      } else {
        newPosition = (segment.start - segment.length) * 8;

        let newSegment = resolveCollision(newPosition);
        if (newSegment || newPosition <= 0) {
          console.log(segment.start, segment.length, newPosition);

          return translate.x;
        }
      }

      return newPosition;
    }

    function handleDragMove(delta: Coordinates) {
      let translateResult = initialTranslate.x + delta.x;

      let newPosition = resolveCollision(translateResult);
      console.log(newPosition);

      if (newPosition) {
        setTranslate({
          initialTranslate,
          translate: {
            ...translate,
            x: moveDraggableToEdge(newPosition),
          },
        });
      } else {
        let pepe = resolveCollision(8);
        setTranslate({
          initialTranslate,
          translate: {
            ...translate,
            x:
              translateResult > 8
                ? translateResult
                : (pepe ? moveDraggableToEdge(pepe) : 8) -
                  initialWindowScroll.x,
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
          // mouseOverRef.current = 0;
          setInitialWindowScroll({
            x: window.scrollX,
            y: window.scrollY,
          });
        }}
        onDragMove={({ delta }) => {
          // console.log(ref);
          handleDragMove(delta);
        }}
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
);
