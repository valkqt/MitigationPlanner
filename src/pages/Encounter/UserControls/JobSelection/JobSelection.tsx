import css from "./JobSelection.module.css";
import { Job } from "../../../../types";
import classNames from "classnames";

interface JobSelectionProps {
  jobs: Job[];
  onToggle: (job: Job, index: number) => void;
}

export default function JobSelection({ jobs, onToggle }: JobSelectionProps) {
  return (
    <div className={css.JobSelection}>
      {jobs.map((job, index) => (
        <div key={index} onClick={() => onToggle(job, index)}>
          <div
            className={classNames(
              {
                [css.active]: job.active,
                [css.inactive]: !job.active,
              },
              css.classButton
            )}
          >
            <img src={job.icon} className={css.transparentIcon} />
            <div className={css.JobName}>{job.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
