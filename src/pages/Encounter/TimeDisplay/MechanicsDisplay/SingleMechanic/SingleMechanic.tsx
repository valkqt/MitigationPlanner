import { Mechanic } from "../../../../../types";
import css from "./SingleMechanic.module.css";
import classNames from "classnames";
import { useEffect } from "react";

interface SingleMechanicProps {
  mechanic: Mechanic;
  width: number;
  top: number;
  setMaxWidth: (param: number) => void;
}

export default function SingleMechanic({
  mechanic,
  width,
  top,
  setMaxWidth,
}: SingleMechanicProps) {
  useEffect(() => {
    if (mechanic) {
      const element = document.getElementById(mechanic.name + mechanic.start);
      if (element) {
        if (element.clientWidth < width) {
          setMaxWidth(element.clientWidth);
        }
      }
    }
  }, [width]);

  return (
    <div className={css.spaceBorder} style={{ width: width, top: -top / 2 }}>
      <div
        className={classNames(["mechanicsText", { greyText: !mechanic.main }])}
        id={mechanic.name + mechanic.start}
      >
        {mechanic.name}
      </div>
    </div>
  );
}
