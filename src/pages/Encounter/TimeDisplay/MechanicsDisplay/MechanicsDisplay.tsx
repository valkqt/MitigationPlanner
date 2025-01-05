import { useState } from "react";
import { Encounter } from "../../../../types";
import css from "./MechanicsDisplay.module.css";
import classNames from "classnames";
import Bullet from "./Bullet";
import { gridSize } from "../../../../globals";
import BossRow from "../../Row/BossRow";

interface MechanicsDisplayProps {
  encounter: Encounter;
}

export default function MechanicsDisplay({ encounter }: MechanicsDisplayProps) {
  const [width, setWidth] = useState<number>(100);

  // function GenerateMechanicTitles(index: number) {
  //   const mechanic = encounter.nodes.find((node) => node.start === index);

  //   if (mechanic) {
  //     return (
  //       <SingleMechanic
  //         mechanic={mechanic}
  //         width={width}
  //         setMaxWidth={setWidth}
  //         top={calculateHeight(width)}
  //       />
  //     );
  //   }
  // }

  function calculateHeight(diagonal: number) {
    const sin = Math.sin(38.5);
    return diagonal * sin;
  }

  return (
    // <div
    //   className={css.tickContainer}
    //   style={{ height: calculateHeight(width) + 16 }}
    // >
    //   {Array.from({ length: encounter.duration + 1 }, (_, index) => {
    //     return (
    //       <div className={classNames(css.space)} key={index}>
    //         {GenerateMechanicTitles(index)}
    //       </div>
    //     );
    //   })}
    // </div>
    // <div className={css.testHorizontalDots}>
    //   {encounter.nodes.map((n) => {
    //     return (
    //       <Bullet
    //         node={n}
    //         setMinWidth={setWidth}
    //         width={n.duration * gridSize}
    //         key={n.id}
    //       />
    //     );
    //   })}
    // </div>
    <></>
  );
}
