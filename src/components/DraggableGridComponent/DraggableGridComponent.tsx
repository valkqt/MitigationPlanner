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

let absoluteMousePosition: number;
document.addEventListener("mousemove", (e) => {
  absoluteMousePosition = e.pageX - 64;

  let mrow;
  if (absoluteMousePosition % 8 === 0) {
    return absoluteMousePosition;
  } else {
    let position = absoluteMousePosition;
    while (!(position % 8 === 0)) {
      position -= 1;
    }
    mrow = position;
  }
  absoluteMousePosition = mrow;
});

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

    const [mousePosition, setMousePosition] = useState<number>(0);
    const [fixedMousePosition, setFixedMousePosition] = useState<number>(0);

    const mouseOverRef = ref as MutableRefObject<number>;

    function resolveCollision(translationResult: number): Segment | undefined {
      const dragSegmentStart = translationResult / 8;
      const dragSegmentEnd = dragSegmentStart + entity.length;

      const pepe = segments.find(
        (seg) =>
          seg.start < dragSegmentEnd &&
          dragSegmentStart < seg.start + seg.length &&
          seg.segmentId !== entity.segmentId
      );

      return pepe;
    }

    function moveDraggableToEdge(segment: Segment): void {
      let collisionResult;
      const segmentEnd = segment.start + segment.length;

      if (absoluteMousePosition >= segmentEnd * 8) {
        console.log("mouse > end");
        collisionResult = segmentEnd * 8;
        const newSegment = resolveCollision(collisionResult);

        if (newSegment) {
          setTranslate({
            initialTranslate,
            translate,
          });
        } else {
          setTranslate({
            initialTranslate,
            translate: { ...translate, x: collisionResult },
          });
        }
      } else if (absoluteMousePosition < segment.start * 8) {
        collisionResult = (segment.start - segment.length) * 8;
        const newSegment = resolveCollision(collisionResult);
        if (collisionResult < 8) {
          return;
        }
        if (newSegment) {
          setTranslate({
            initialTranslate,
            translate,
          });
        } else {
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

      const newPosition = resolveCollision(translateResult);

      if (newPosition) {
        moveDraggableToEdge(newPosition);
      } else {
        if (translateResult < 0) {
          setTranslate({ initialTranslate, translate: { ...translate, x: 8 } });
          return;
        }
        setTranslate({
          initialTranslate,
          translate: { ...translate, x: translateResult },
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
          mouseOverRef.current = translate.x / 8;
          setFixedMousePosition(mousePosition);
          setInitialWindowScroll({
            x: window.scrollX,
            y: window.scrollY,
          });
        }}
        onDragMove={({ delta }) => {
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
          setMouse={setMousePosition}
          mouse={mousePosition}
        />
      </DndContext>
    );
  }
);
