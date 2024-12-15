import { useState } from "react";
import css from "./Encounter.module.css";
import { Ability, Job } from "../../types";
import Row from "./Row/Row";
import TimeDisplay from "./TimeDisplay/TimeDisplay";
import { AbilityType, databaseJobs, encounter, Target } from "../../globals";
import UserControls from "./UserControls/UserControls";

export default function Encounter() {
  const [abilities, setAbilities] = useState<Ability[]>(initializeAbilities);

  const [jobs, setJobs] = useState<Job[]>(databaseJobs);

  function handleJobSelection(job: Job, index: number) {
    setJobs(
      jobs.toSpliced(index, 1, {
        ...job,
        active: !job.active,
      })
    );
    return;
  }

  function toggleAbility(ability: Ability, index: number) {
    setAbilities(
      abilities.toSpliced(index, 1, {
        ...ability,
        active: !ability.active,
      })
    );
  }

  function handleAbilityFilter(filter: Target | AbilityType) {
    let filtered;

    if (filter in Target) {
      filtered = abilities.map((a) => {
        return a.target === filter ? { ...a, active: !a.active } : a;
      });
    } else {
      filtered = abilities.map((a) => {
        return a.type === filter ? { ...a, active: !a.active } : a;
      });
    }
    setAbilities(filtered);
  }

  function getActiveAbilities(abilities: Ability[]): Ability[] {
    const activeAbilities = abilities.filter(
      (ability) => ability.active === true
    );

    return activeAbilities;
  }

  function initializeAbilities(): Ability[] {
    let result: Ability[] = [];
    databaseJobs.forEach((job) => {
      result = result.concat(getActiveAbilities(job.skills));
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
