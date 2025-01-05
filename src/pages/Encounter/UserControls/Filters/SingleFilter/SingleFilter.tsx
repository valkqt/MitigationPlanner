import classNames from "classnames";
import css from "./SingleFilter.module.css";
import { useActivationFlagsContext } from "../../../../../contexts/ActivationFlagsContext";
import { PlayerSkillType, SkillTarget } from "../../../../../globals";

interface SingleFilterProps {
  label: SkillTarget | PlayerSkillType;
  onClickToggle: (lbl: SkillTarget | PlayerSkillType) => void;
}
export default function SingleFilter({
  label,
  onClickToggle,
}: SingleFilterProps) {
  const [flags] = useActivationFlagsContext();

  function toggleCheckmark() {
    if (label in SkillTarget) {
      return flags.target[label];
    } else {
      return flags.type[label];
    }
  }
  return (
    <div className={css.filter} onClick={() => onClickToggle(label)}>
      {label}
      <div className={classNames({ toggleVisibility: !toggleCheckmark() })}>
        &#10003;
      </div>
      {/* <input type="checkbox" /> */}
    </div>
  );
}
