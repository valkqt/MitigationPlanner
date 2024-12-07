import { useEffect, useState } from "react";
import css from "./Encounter.module.css";
import { Ability, Job } from "../../types";
import SingleLane from "./SingleLane/SingleLane";
import JobSelection from "./JobSelection/JobSelection";
import TimeDisplay from "./TimeDisplay/TimeDisplay";
import { databaseJobs, encounter } from "../../globals";

export default function Encounter() {
  const [jobs, setJobs] = useState<Job[]>(databaseJobs);
  const [abilities, setAbilities] = useState<Ability[]>(initializeAbilities);

  function getActiveJobs(jobs: Job[]): Job[] {
    const activeJobs = jobs.filter((a) => a.active);
    return activeJobs;
  }

  function getActiveAbilities(abilities: Ability[]): Ability[] {
    const activeAbilities = abilities.filter(
      (ability) => ability.active === true
    );

    return activeAbilities;
  }

  function initializeAbilities(): Ability[] {
    let result: Ability[] = [];
    jobs.forEach((job) => {
      result = result.concat(getActiveAbilities(job.skills));
    });

    return result;
  }

  return (
    <div className={css.TimelineContainer}>
      <JobSelection
        jobs={jobs}
        onJobChange={(job, index) => {
          setJobs(jobs.toSpliced(index, 1, job));
        }}
      />
      {/* <div>
        {jobs.map((a) => (
          <div className={css.classButton}>
            <img src={a.icon} className={css.transparentIcon} />
          </div>
        ))}
      </div> */}
      <TimeDisplay encounter={encounter} />
      <div>
        {abilities.map((ability) => {
          return <SingleLane ability={ability} duration={encounter.duration} />;
        })}
      </div>
    </div>
  );
}
