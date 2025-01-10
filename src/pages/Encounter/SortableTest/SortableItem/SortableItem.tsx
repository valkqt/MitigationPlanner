import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Row from "../../Row/Row";
import { databaseJobs } from "../../../../globals";
import { PlayerSkill } from "../../../../types";

interface SortableItemProps {
  id: number;
  ability: PlayerSkill;
  order: number;
}

export function SortableItem({ id, ability, order }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    order: order,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Row ability={ability} jobs={databaseJobs} duration={1200} />
    </div>
  );
}
