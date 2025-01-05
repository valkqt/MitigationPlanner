import css from "./Filters.module.css";
import SingleFilter from "./SingleFilter/SingleFilter";
import { Ability } from "../../../../types";
import { PlayerSkillType, SkillTarget } from "../../../../globals";
import LevelFilter from "./LevelFilter/LevelFilter";

interface FiltersProps {
  abilities: Ability[];
  onSkillTargetToggle: any;
  onLevelFilter: any;
}

export default function Filters({
  onSkillTargetToggle,
  onLevelFilter,
}: FiltersProps) {
  return (
    <div className={css.FilterContainer}>
      <div>
        <div className={css.FilterHeader}>Level:</div>
        <LevelFilter onLevelFilter={onLevelFilter} />
      </div>

      <div>
        <div className={css.FilterHeader}>SkillTarget:</div>
        {Array.from(Object.values(SkillTarget)).map((type) => (
          <SingleFilter
            label={type}
            onClickToggle={onSkillTargetToggle}
            key={type}
          />
        ))}
      </div>
      <div>
        <div className={css.FilterHeader}>Type:</div>
        {Array.from(Object.values(PlayerSkillType)).map((type) => (
          <SingleFilter
            label={type}
            onClickToggle={onSkillTargetToggle}
            key={type}
          />
        ))}
      </div>
    </div>
  );
}
