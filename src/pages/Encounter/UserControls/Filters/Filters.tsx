import css from "./Filters.module.css";
import SingleFilter from "./SingleFilter/SingleFilter";
import { Ability } from "../../../../types";
import { AbilityType, Target } from "../../../../globals";

interface FiltersProps {
  abilities: Ability[];
  onTargetToggle: any;
}

export default function Filters({ onTargetToggle }: FiltersProps) {
  return (
    <div className={css.FilterContainer}>
      <div>
        <div className={css.FilterHeader}>Target:</div>
        {Array.from(Object.values(Target)).map((type) => (
          <SingleFilter
            label={type}
            onClickToggle={onTargetToggle}
            key={type}
          />
        ))}
      </div>
      <div>
        <div className={css.FilterHeader}>Type:</div>
        {Array.from(Object.values(AbilityType)).map((type) => (
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
