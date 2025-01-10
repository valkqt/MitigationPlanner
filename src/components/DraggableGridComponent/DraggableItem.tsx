import { Translate } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { Axis } from "../../globals";
import { Draggable } from "./Draggable/Draggable";
import { PlayerSkill } from "../../types";

interface DraggableItemProps {
  handle?: boolean;
  style?: React.CSSProperties;
  translate: Translate;
  axis?: Axis;
  ability: PlayerSkill;
  onRightClick: any;
  isMoving: boolean;
}

export default function DraggableItem({
  axis,
  style,
  translate,
  handle,
  ability,
  onRightClick,
  isMoving,
}: DraggableItemProps) {
  const { attributes, isDragging, listeners, setNodeRef } = useDraggable({
    id: "draggable",
  });

  return (
    <Draggable
      ref={setNodeRef}
      dragging={isDragging}
      handle={handle}
      listeners={listeners}
      style={style}
      translate={translate}
      axis={axis}
      {...attributes}
      ability={ability}
      onRightClick={onRightClick}
      onMove={isMoving}
    />
  );
}
