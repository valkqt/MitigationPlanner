import css from "./SingleFilter.module.css";

interface SingleFilterProps {
  label: string;
  onClickToggle: (lbl: unknown) => void;
}
export default function SingleFilter({
  label,
  onClickToggle,
}: SingleFilterProps) {
  return (
    <div className={css.SingleFilter} onClick={() => onClickToggle(label)}>
      <label>{label}</label>
      <input type="checkbox" />
    </div>
  );
}
