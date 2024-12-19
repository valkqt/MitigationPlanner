import { useActivationFlagsContext } from "../../../../../contexts/ActivationFlagsContext";
import { levelArray } from "../../../../../globals";

interface LevelFilterProps {
  onLevelFilter: (threshold: number) => void;
}

export default function LevelFilter({ onLevelFilter }: LevelFilterProps) {
  const [flags] = useActivationFlagsContext();
  return (
    <select
      onChange={(e) => {
        try {
          const levelCap = parseInt(e.target.value);
          onLevelFilter(levelCap);
          console.log();
        } catch {
          console.error("bro");
        }
      }}
    >
      {levelArray.map((level) => (
        <option value={level} key={level} selected={level === flags.level}>
          {level}
        </option>
      ))}
    </select>
  );
}
