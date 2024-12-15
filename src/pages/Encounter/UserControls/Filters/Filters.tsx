import css from "./Filters.module.css";
import SingleFilter from "./SingleFilter/SingleFilter";
import { Ability } from "../../../../types";

interface FiltersProps {
  onToggle: any;
  abilities: Ability[];
  onTargetToggle: any;
}

export default function Filters({ onTargetToggle }: FiltersProps) {
  const targetTypes = ["Individual", "Party", "Self"];
  const abilityTypes = ["Mitigation", "Healing", "Other"];

  return (
    <div className={css.FilterContainer}>
      <div>
        <div className={css.FilterHeader}>Target:</div>
        {targetTypes.map((type) => (
          <SingleFilter
            label={type}
            onClickToggle={onTargetToggle}
            key={type}
          />
        ))}
      </div>
      <div>
        <div className={css.FilterHeader}>Type:</div>
        {abilityTypes.map((type) => (
          <SingleFilter
            label={type}
            onClickToggle={onTargetToggle}
            key={type}
          />
        ))}
      </div>
    </div>
  );
}
