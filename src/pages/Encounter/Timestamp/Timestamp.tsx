import css from "./Timestamp.module.css";

interface TimestampProps {
  seconds: number;
  minutes: number;
}

export default function Timestamp({ seconds, minutes }: TimestampProps) {
  return (
    <div className={css.timestamp}>
      <div className={css.minutes}>{minutes}</div>
      <div className={css.dots}>:</div>
      <div className={css.seconds}>{seconds.toString().padEnd(2, "0")}</div>
    </div>
  );
}
