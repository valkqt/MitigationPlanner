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
  onTargetToggle: any;
}

export default function UserControls({
  jobs,
  onJobToggle,
  abilities,
  onAbilityToggle,
  onTargetToggle,
}: UserControlsProps) {
  return (
    <div className={css.UserControls}>
      <Filters
        onTargetToggle={onTargetToggle}
        abilities={abilities}
        onToggle={() => {}}
      />
      <JobSelection jobs={jobs} onToggle={onJobToggle} />
      <div className={css.AbilitySelection}>
        {abilities.map((ability, index) => (
          <SingleAbility
            ability={ability}
            index={index}
            onToggle={onAbilityToggle}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}