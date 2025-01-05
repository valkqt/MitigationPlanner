import css from "./UserControls.module.css";
import { PlayerSkill, Job } from "../../../types";
import JobSelection from "./JobSelection/JobSelection";
import Filters from "./Filters/Filters";
import AbilityFilter from "./AbilityFilter/AbilityFilter";

interface UserControlsProps {
  jobs: Job[];
  onJobToggle: any;
  abilities: PlayerSkill[];
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
      <AbilityFilter
        onAbilityToggle={onAbilityToggle}
        abilities={abilities}
        jobs={jobs}
      />
    </div>
  );
}
