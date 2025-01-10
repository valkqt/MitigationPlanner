import { useActivationFlagsContext } from "../../../../contexts/ActivationFlagsContext";
import { PlayerSkill } from "../../../../types";
import css from "./SingleAbility.module.css";
import classNames from "classnames";

interface SingleAbilityProps {
  ability: PlayerSkill;
  onToggle: (abilityId: number) => void;
}
export default function SingleAbility({
  ability,
  onToggle,
}: SingleAbilityProps) {
  const [flags] = useActivationFlagsContext();
  return (
    <div className={css.SingleAbility} onClick={() => onToggle(ability.id)}>
      <div>
        <img src={ability.icon} className={"smallAbilityIcon"} />
      </div>

      <div className={css.AbilityLabel}>
        <div>{ability.name}</div>
        <div
          className={classNames({
            toggleVisibility: !flags.abilities[ability.id],
          })}
        >
          &#10003;
        </div>
      </div>
    </div>
  );
}
