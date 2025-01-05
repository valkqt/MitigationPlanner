import { useEffect, useState } from "react";
import { Timeline } from "../../../../types";
import css from "./MechanicsDisplay.module.css";

interface BulletProps {
  node: Timeline;
  width: number;
  setMinWidth: any;
}

export default function Bullet({ node, width, setMinWidth }: BulletProps) {
  const [isHover, setIsHover] = useState(false);
  // useEffect(() => {
  //   if (node) {
  //     const element = document.getElementById(node.id + node.mechanic.name);
  //     if (element) {
  //       if (element.clientWidth < width) {
  //         setMinWidth(element.clientWidth);
  //       }
  //     }
  //   }
  // }, [width]);
  return (
    <div
      className={css.bullet}
      style={{ left: node.timestamp * 8 - 12, width: width + "px" }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      id={node.id + node.mechanic.name}
    >
      <div className={css.bulletText}>
        {/* &#9679; */}
        {node.mechanic.name}
      </div>
    </div>
  );
}
