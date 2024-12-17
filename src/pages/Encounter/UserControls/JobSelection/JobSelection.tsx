import css from "./JobSelection.module.css";
import { Job } from "../../../../types";
import classNames from "classnames";
import { useActivationFlagsContext } from "../../../../contexts/ActivationFlagsContext";

interface JobSelectionProps {
  jobs: Job[];
  onToggle: (jobId: number) => void;
}

export default function JobSelection({ jobs, onToggle }: JobSelectionProps) {
  const [flags] = useActivationFlagsContext();
  return (
    <div className={css.JobSelection}>
      {jobs.map((job, index) => (
        <div key={index} onClick={() => onToggle(job.id)}>
          <div
            className={classNames(
              {
                [css.active]: flags.jobs[job.id],
                [css.inactive]: !flags.jobs[job.id],
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
