import { Job } from "../../../../types";
import css from "./JobCheckbox.module.css";

interface JobCheckboxProps {
  job: Job;
  onToggle: () => void;
}

export default function JobCheckbox({ job, onToggle }: JobCheckboxProps) {
  return (
    <div className={css.formGroup}>
      <label htmlFor={job.name}>{job.name.toUpperCase()}</label>
      <input
        type="checkbox"
        id={job.name}
        name={job.name}
        onChange={onToggle}
        defaultChecked
      />
    </div>
  );
}
