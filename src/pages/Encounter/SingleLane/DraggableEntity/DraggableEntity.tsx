import { Ability } from "../../../../types";
import css from "./DraggableEntity.module.css";

interface DraggableEntityProps {
  ability: Ability;
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
          width: ability.duration * 8 + "px",
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
          width: (ability.cooldown - ability.duration) * 8 + "px",
        }}
      ></div>
      {/* <div className={css.IconContainer}>
        <img src={ability.icon} className={css.AbilityIcon} />
      </div>
      <div> {ability.name}</div> */}
    </div>
  );
}