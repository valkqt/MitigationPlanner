import { Translate } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { Axis } from "../../enums/Axis";
import { Draggable } from "./Draggable/Draggable";
import { Ability } from "../../types";

interface DraggableItemProps {
  handle?: boolean;
  style?: React.CSSProperties;
  translate: Translate;
  axis?: Axis;
  ability: Ability;
  onRightClick: any;
}

export default function DraggableItem({
  axis,
  style,
  translate,
  handle,
  ability,
  onRightClick,
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
    />
  );
}
