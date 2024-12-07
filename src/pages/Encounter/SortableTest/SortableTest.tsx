// import { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { SortableItem } from "./SortableItem/SortableItem";
// import { Job } from "../../../types";

// interface SortableRowProps {
//   items: Job[];
// }

// export default function SortableTest({ items }: SortableRowProps) {
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//     >
//       <SortableContext items={items} strategy={verticalListSortingStrategy}>
//         {items.map((ability) => (
//           <SortableItem key={ability.id} id={ability.id} />
//         ))}
//       </SortableContext>
//     </DndContext>
//   );

//   function handleDragEnd(event: any) {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setItems((items) => {
//         const oldIndex = items.indexOf(active.id);
//         const newIndex = items.indexOf(over.id);

//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   }
// }
