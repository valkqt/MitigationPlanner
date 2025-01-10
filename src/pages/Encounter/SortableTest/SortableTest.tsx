import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem/SortableItem";
import { PlayerSkill } from "../../../types";

interface SortableRowProps {
  abilities: PlayerSkill[];
}

export default function SortableTest({ abilities }: SortableRowProps) {
  const [items, setItems] = useState(initializeSortableIndex);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function initializeSortableIndex(): number[] {
    const state = abilities.map((ability) => {
      return ability.id;
    });
    console.log(state);
    return state;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {abilities.map((i) => (
            <SortableItem
              id={i.id}
              key={i.id}
              ability={i}
              order={items.findIndex((a) => a === i.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      console.log(items);
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}
