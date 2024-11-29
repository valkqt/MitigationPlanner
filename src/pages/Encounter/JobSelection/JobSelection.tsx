import JobCheckbox from "./JobCheckbox/JobCheckbox";
import css from "./JobSelection.module.css";
import { Job } from "../../../types";

interface JobSelectionProps {
  jobs: Job[];
  onJobChange: (job: Job, index: number) => void;
}

export default function JobSelection({ jobs, onJobChange }: JobSelectionProps) {
  // const [activeChecks, setActiveChecks] = useState<ActiveJob[]>([]);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <div>
      <form className={css.timelineForm} onSubmit={handleSubmit}>
        {jobs.map((job, index) => (
          <JobCheckbox
            job={job}
            key={job.id}
            onToggle={() =>
              onJobChange(
                {
                  ...job,
                  active: !job.active,
                },
                index
              )
            }
          />
        ))}
      </form>
    </div>
  );
}
