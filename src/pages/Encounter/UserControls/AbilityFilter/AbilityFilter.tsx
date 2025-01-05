import { Job, PlayerSkill } from "../../../../types";
import css from "./AbilityFilter.module.css";
import SingleAbility from "../SingleAbility/SingleAbility";
import { useState } from "react";
import classNames from "classnames";

interface AbilityFilterProps {
  abilities: PlayerSkill[];
  onAbilityToggle: any;
  jobs: Job[];
}

export default function AbilityFilter({
  abilities,
  onAbilityToggle,
  jobs,
}: AbilityFilterProps) {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0]);
  return (
    <div className={css.container}>
      <div className={css.jobFilter}>
        <div onClick={() => setOpen(!open)}>
          <div className={css.label}>
            <img src={selectedJob.icon} className="miniIcon" />

            {selectedJob.name}
          </div>
          <div className={classNames({ toggleDisplay: !open }, css.dropdown)}>
            {jobs.map((job) => (
              <div
                key={job.id}
                className={css.dropdownItem}
                onClick={() => setSelectedJob(job)}
              >
                <img src={job.icon} className="miniIcon" />
                <div>{job.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={css.idk}>idk</div>
      </div>
      {selectedJob.skills.map((ability) => (
        <SingleAbility
          ability={ability}
          onToggle={onAbilityToggle}
          key={ability.id}
        />
      ))}
    </div>
  );
}
