import { useState } from "react";
import css from "./Encounter.module.css";
import { PlayerSkill, Job } from "../../types";
import Row from "./Row/Row";
import TimeDisplay from "./TimeDisplay/BossTimeline";
import {
  PlayerSkillType,
  databaseJobs,
  encounters,
  SkillTarget,
} from "../../globals";
import UserControls from "./UserControls/UserControls";
import { useActivationFlagsContext } from "../../contexts/ActivationFlagsContext";
import { FlagActivationTypes } from "../../contexts/ActivationFlagsContextProvider";
import BossRow from "./Row/BossRow";

export default function Encounter() {
  const [abilities] = useState<PlayerSkill[]>(initializeAbilities);

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

  function handleLevelFilter(threshold: number) {
    setFlags({
      type: FlagActivationTypes.LevelFilterFlag,
      payload: threshold,
    });
  }

  function handleAbilityFilter(filter: SkillTarget | PlayerSkillType) {
    if (filter in SkillTarget) {
      setFlags({
        type: FlagActivationTypes.ToggleSkillTargetFlag,
        payload: filter,
      });
    } else {
      setFlags({
        type: FlagActivationTypes.TogglePlayerSkillTypeFlag,
        payload: filter,
      });
    }
  }

  function initializeAbilities(): PlayerSkill[] {
    let result: PlayerSkill[] = [];
    databaseJobs.forEach((job) => {
      result = result.concat(job.skills);
    });

    return result;
  }

  return (
    <div className={css.TimelineContainer}>
      <div className={css.EncounterInfo}>
        <h1 className={css.EncounterHeader}>{encounters[0].name}</h1>
      </div>
      <UserControls
        jobs={jobs}
        onJobToggle={handleJobSelection}
        abilities={abilities}
        onAbilityToggle={toggleAbility}
        onSkillTargetToggle={handleAbilityFilter}
        onLevelFilter={handleLevelFilter}
      />
      <TimeDisplay encounter={encounters[0]} />
      <div>
        <BossRow encounter={encounters[0]} />
        {abilities.map((ability) => {
          return (
            <Row
              ability={ability}
              duration={encounters[0].duration}
              jobs={jobs}
              key={ability.id}
            />
          );
        })}
      </div>
    </div>
  );
}
