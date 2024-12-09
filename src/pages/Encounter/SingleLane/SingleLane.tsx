import DraggableGridComponent from "../../../components/DraggableGridComponent/DraggableGridComponent";
import { GenerateRandomString } from "../../../functions/GenerateRandomString";
import { Ability, Segment } from "../../../types";
import css from "./SingleLane.module.css";
import { useState } from "react";

interface SingleLaneProps {
  ability: Ability;
  duration: number;
}

export default function SingleLane({ ability, duration }: SingleLaneProps) {
  const [entities, setEntities] = useState<Segment[]>([]);

  function removeSegment(id: string) {
    setEntities(
      entities.toSpliced(
        entities.findIndex((segment) => segment.segmentId === id),
        1
      )
    );
  }

  function createSegment(position: number, ability: Ability) {
    const alreadyExists = entities.some(
      (segment) =>
        position <= segment.start &&
        segment.start <= position + ability.cooldown
    );

    if (alreadyExists) {
      return;
    }

    setEntities([
      ...entities,
      {
        abilityId: ability.id,
        segmentId: GenerateRandomString(),
        length: ability.cooldown,
        start: position === 0 ? position + 1 : position,
      },
    ]);
  }

  return (
    <div className={css.Lane}>
      <div className={css.LaneIconContainer}>
        <img src={ability.icon} style={{ width: "48px", height: "48px" }} />
      </div>
      {Array.from({ length: duration + 1 }, (_, index) => {
        return (
          <div
            key={index}
            className={css.filler}
            style={{ left: 64 + index * 8 }}
            id={index.toString()}
            onClick={() => createSegment(index, ability)}
          ></div>
        );
      })}

      {entities.map((entity) => (
        <DraggableGridComponent
          ability={ability}
          onRightClick={() => removeSegment(entity.segmentId)}
          key={entity.segmentId}
          entity={entity}
          nodes={entities}
          setNodes={setEntities}
        />
      ))}
    </div>
  );
}
