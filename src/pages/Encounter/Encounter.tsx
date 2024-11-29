import { useState } from "react";
import css from "./Encounter.module.css";
import { Job } from "../../types";
import SingleLane from "./SingleLane/SingleLane";
import classNames from "classnames";
import Timestamp from "./Timestamp/Timestamp";
import JobSelection from "./JobSelection/JobSelection";

export const jobsWithAbilitys = [
  {
    id: 0,
    name: "sge",
    skills: [
      {
        id: 1,
        name: "Holos",
        duration: 20,
        cooldown: 120,
        icon: "./icons/SGE_holos.png",
        color1: "#60cdb2",
        color2: "#08453f",
      },
    ],
    active: true,
  },
  {
    id: 1,
    name: "whm",
    skills: [
      {
        id: 2,
        name: "Temperance",
        duration: 20,
        cooldown: 120,
        icon: "./icons/WHM_temperance.png",
        color1: "white",
        color2: "white",
      },
    ],
    active: true,
  },
  {
    id: 2,
    name: "sch",
    skills: [
      {
        id: 3,
        name: "Expedience",
        duration: 15,
        cooldown: 120,
        icon: "./icons/SCH_expedient.png",
        color1: "white",
        color2: "white",
      },
    ],
    active: true,
  },
  {
    id: 3,
    name: "ast",
    skills: [
      {
        id: 4,
        name: "Collective Unconscious",
        duration: 15,
        cooldown: 30,
        icon: "./icons/AST_collective_unconscious.png",
        color1: "white",
        color2: "white",
      },
    ],
    active: true,
  },
];

const encounter = {
  name: "The Omega Protocol",
  duration: 1200,
  nodes: [{ name: "Looper", start: 20, end: 25 }],
};

export default function Encounter() {
  const [jobs, setJobs] = useState<Job[]>(jobsWithAbilitys);

  return (
    <div className={css.TimelineContainer}>
      <JobSelection
        jobs={jobs}
        onJobChange={(job, index) => {
          setJobs(jobs.toSpliced(index, 1, job));
        }}
      />
      <div>
        <div className={css.timeDisplay}>
          <div>
            <div className={css.timeNumber}>
              {Array.from({ length: encounter.duration + 1 }, (_, index) => {
                let hours = Math.floor(index / 3600);
                let minutes = Math.floor((index - hours * 3600) / 60);
                let seconds = index - hours * 3600 - minutes * 60;

                if (index % 10 === 0) {
                  return (
                    <Timestamp
                      seconds={seconds}
                      minutes={minutes}
                      key={index}
                    />
                  );
                }
              })}
            </div>
            <div className={css.tickContainer}>
              {Array.from({ length: encounter.duration + 1 }, (_, index) => {
                if (index % 10 === 0) {
                  return (
                    <div className={classNames(css.tick, css.tenSeconds)}></div>
                  );
                } else if (index % 5 === 0) {
                  return (
                    <div
                      className={classNames(css.tick, css.fiveSeconds)}
                    ></div>
                  );
                } else {
                  return (
                    <div className={classNames(css.tick, css.oneSecond)}></div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        {jobs.map(
          (job) =>
            job.active && (
              <SingleLane
                ability={job.skills[0]}
                duration={encounter.duration}
              />
            )
        )}
      </div>
    </div>
  );
}
