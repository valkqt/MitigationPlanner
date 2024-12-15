import { Ability } from "../../../../types";
import css from "./SingleAbility.module.css";
import classNames from "classnames";

interface SingleAbilityProps {
  ability: Ability;
  index: number;
  onToggle: any;
}
export default function SingleAbility({
  ability,
  index,
  onToggle,
}: SingleAbilityProps) {
  return (
    <div className={css.SingleAbility} onClick={() => onToggle(ability, index)}>
      <div>
        <img src={ability.icon} className={css.smallAbilityIcon} />
      </div>

      <div className={css.AbilityLabel}>
        <div>{ability.name}</div>
        <div className={classNames({ toggleVisibility: !ability.active })}>
          &#10003;
        </div>
      </div>
    </div>
  );
}
