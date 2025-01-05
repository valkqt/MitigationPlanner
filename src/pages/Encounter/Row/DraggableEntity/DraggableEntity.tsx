import { gridSize } from "../../../../globals";
import { PlayerSkill } from "../../../../types";
import css from "./DraggableEntity.module.css";

interface DraggableEntityProps {
  ability: PlayerSkill;
}

export default function DraggableEntity({ ability }: DraggableEntityProps) {
  return (
    <div
      className={css.SingleEntity}
      style={{ backgroundColor: ability.color2, borderRadius: "0.20rem" }}
    >
      <div
        className={css.segment}
        style={{
          width: ability.duration * gridSize + "px",
          backgroundColor: ability.color1,
        }}
      >
        <div className={css.IconContainer}>
          <img src={ability.icon} className={css.AbilityIcon} />
        </div>
        <div>{ability.name}</div>
      </div>
      <div
        style={{
          width: (ability.cooldown - ability.duration) * gridSize + "px",
        }}
      ></div>
    </div>
  );
}
