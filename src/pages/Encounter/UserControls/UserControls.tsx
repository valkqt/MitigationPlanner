import css from "./UserControls.module.css";
import { Ability, Job } from "../../../types";
import JobSelection from "./JobSelection/JobSelection";
import SingleAbility from "./SingleAbility/SingleAbility";
import Filters from "./Filters/Filters";

interface UserControlsProps {
  jobs: Job[];
  onJobToggle: any;
  abilities: Ability[];
  onAbilityToggle: any;
  onSkillTargetToggle: any;
  onLevelFilter: any;
}

export default function UserControls({
  jobs,
  onJobToggle,
  abilities,
  onAbilityToggle,
  onSkillTargetToggle,
  onLevelFilter,
}: UserControlsProps) {
  return (
    <div className={css.UserControls}>
      <Filters
        onSkillTargetToggle={onSkillTargetToggle}
        abilities={abilities}
        onLevelFilter={onLevelFilter}
      />
      <JobSelection jobs={jobs} onToggle={onJobToggle} />
      <div className={css.AbilitySelection}>
        {abilities.map((ability) => (
          <SingleAbility
            ability={ability}
            onToggle={onAbilityToggle}
            key={ability.id}
          />
        ))}
      </div>
    </div>
  );
}
