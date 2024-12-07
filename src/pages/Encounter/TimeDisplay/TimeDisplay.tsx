import css from "./TimeDisplay.module.css";
import classNames from "classnames";
import Timestamp from "../Timestamp/Timestamp";
import { Encounter } from "../../../types";

interface TimeDisplayProps {
  encounter: Encounter;
}

export default function TimeDisplay({ encounter }: TimeDisplayProps) {
  return (
    <div className={css.timeDisplay}>
      <div>
        <div className={css.timeNumber}>
          {Array.from({ length: encounter.duration + 1 }, (_, index) => {
            let hours = Math.floor(index / 3600);
            let minutes = Math.floor((index - hours * 3600) / 60);
            let seconds = index - hours * 3600 - minutes * 60;

            if (index % 10 === 0) {
              return (
                <Timestamp seconds={seconds} minutes={minutes} key={index} />
              );
            }
          })}
        </div>
        <div className={css.tickContainer}>
          {Array.from({ length: encounter.duration + 1 }, (_, index) => {
            if (index % 10 === 0) {
              return (
                <div
                  className={classNames(css.tick, css.tenSeconds)}
                  key={index}
                ></div>
              );
            } else if (index % 5 === 0) {
              return (
                <div
                  className={classNames(css.tick, css.fiveSeconds)}
                  key={index}
                ></div>
              );
            } else {
              return (
                <div
                  className={classNames(css.tick, css.oneSecond)}
                  key={index}
                ></div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
