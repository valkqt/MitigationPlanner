import css from "./BossTimeline.module.css";
import { Encounter } from "../../../types";
import TimelineDisplay from "./TimelineDisplay/TimelineDisplay";

interface TimeDisplayProps {
  encounter: Encounter;
}

export default function BossTimeline({ encounter }: TimeDisplayProps) {
  return (
    <div className={css.timeDisplay}>
      <TimelineDisplay encounter={encounter} />
    </div>
  );
}
