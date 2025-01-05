import { useActivationFlagsContext } from "../../../../../contexts/ActivationFlagsContext";
import { levelArray } from "../../../../../globals";
import css from "./LevelFilter.module.css";

interface LevelFilterProps {
  onLevelFilter: (threshold: number) => void;
}

export default function LevelFilter({ onLevelFilter }: LevelFilterProps) {
  const [flags] = useActivationFlagsContext();
  return (
    <select
      className={css.dropdown}
      onChange={(e) => {
        try {
          const levelCap = parseInt(e.target.value);
          onLevelFilter(levelCap);
        } catch {
          console.error("bro");
        }
      }}
    >
      {levelArray.map((level) => (
        <option
          value={level}
          key={level}
          defaultValue={flags.level}
          className={css.option}
        >
          {level}
        </option>
      ))}
    </select>
  );
}
