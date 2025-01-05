import { Timeline } from "../../../../../types";
import css from "./BossMechanic.module.css";
import { gridSize } from "../../../../../globals";
import { useState } from "react";
import classNames from "classnames";

interface BossMechanicRowProps {
  node: Timeline;
}

export default function BossMechanic({ node }: BossMechanicRowProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={css.container}
      style={{
        width: node.duration * gridSize + "px",
        left: 64 + node.timestamp * gridSize,
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div className={css.label}>
        {node.mechanic.name}
        <div className={classNames({ toggleDisplay: !isHover }, css.tooltip)}>
          {node.mechanic.name}
        </div>
      </div>
    </div>
  );
}
