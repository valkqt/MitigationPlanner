import classNames from "classnames";
import css from "./SingleFilter.module.css";
import { useActivationFlagsContext } from "../../../../../contexts/ActivationFlagsContext";
import { AbilityType, Target } from "../../../../../globals";

interface SingleFilterProps {
  label: Target | AbilityType;
  onClickToggle: (lbl: Target | AbilityType) => void;
}
export default function SingleFilter({
  label,
  onClickToggle,
}: SingleFilterProps) {
  const [flags] = useActivationFlagsContext();

  function toggleCheckmark() {
    if (label in Target) {
      return flags.target[label];
    } else {
      return flags.type[label];
    }
  }
  return (
    <div className={css.SingleFilter} onClick={() => onClickToggle(label)}>
      <label>{label}</label>
      <div className={classNames({ toggleVisibility: !toggleCheckmark() })}>
        &#10003;
      </div>
      {/* <input type="checkbox" /> */}
    </div>
  );
}
