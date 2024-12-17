import { useState } from "react";
import css from "./Encounter.module.css";
import { Ability, Job } from "../../types";
import Row from "./Row/Row";
import TimeDisplay from "./TimeDisplay/TimeDisplay";
import { AbilityType, databaseJobs, encounter, Target } from "../../globals";
import UserControls from "./UserControls/UserControls";
import { useActivationFlagsContext } from "../../contexts/ActivationFlagsContext";
import { FlagActivationTypes } from "../../contexts/ActivationFlagsContextProvider";

export default function Encounter() {
  const [abilities] = useState<Ability[]>(initializeAbilities);

  const [jobs] = useState<Job[]>(databaseJobs);
  const [, setFlags] = useActivationFlagsContext();

  function handleJobSelection(jobId: number) {
    setFlags({ type: FlagActivationTypes.ToggleJobFlag, payload: jobId });
  }

  function toggleAbility(abilityId: number) {
    setFlags({
      type: FlagActivationTypes.ToggleAbilityFlag,
      payload: abilityId,
    });
  }

  function handleAbilityFilter(filter: Target | AbilityType) {
    if (filter in Target) {
      setFlags({ type: FlagActivationTypes.ToggleTargetFlag, payload: filter });
    } else {
      setFlags({
        type: FlagActivationTypes.ToggleAbilityTypeFlag,
        payload: filter,
      });
    }
  }

  function initializeAbilities(): Ability[] {
    let result: Ability[] = [];
    databaseJobs.forEach((job) => {
      result = result.concat(job.skills);
    });

    return result;
  }

  return (
    <div className={css.TimelineContainer}>
      <UserControls
        jobs={jobs}
        onJobToggle={handleJobSelection}
        abilities={abilities}
        onAbilityToggle={toggleAbility}
        onTargetToggle={handleAbilityFilter}
      />
      <TimeDisplay encounter={encounter} />
      <div>
        {abilities.map((ability) => {
          return (
            <Row ability={ability} duration={encounter.duration} jobs={jobs} />
          );
        })}
      </div>
    </div>
  );
}
