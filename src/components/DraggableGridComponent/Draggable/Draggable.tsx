import React, { forwardRef } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners, Translate } from "@dnd-kit/core";
import styles from "./Draggable.module.css";
import { PlayerSkill } from "../../../types";
import { Axis } from "../../../globals";
import DraggableEntity from "../../../pages/Encounter/Row/DraggableEntity/DraggableEntity";

interface Props {
  axis?: Axis;
  dragOverlay?: boolean;
  dragging?: boolean;
  handle?: boolean;
  label?: string;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  translate?: Translate;
  ability: PlayerSkill;
  onMove: boolean;
  onRightClick: () => void;
}

export const Draggable = forwardRef<HTMLButtonElement, Props>(
  function Draggable(
    {
      axis,
      dragOverlay,
      dragging,
      handle,
      label,
      listeners,
      translate,
      ability,
      onRightClick,
      onMove,
      ...props
    }: Props,
    ref
  ) {
    return (
      <div
        className={classNames(
          styles.Draggable,
          dragOverlay && styles.dragOverlay,
          dragging && styles.dragging,
          handle && styles.handle,
          { showDraggableTracking: onMove }
        )}
        style={
          {
            "--translate-x": `${translate?.x ?? 0}px`,
            "--translate-y": `${translate?.y ?? 0}px`,
          } as React.CSSProperties
        }
      >
        <button
          ref={ref}
          {...props}
          aria-label="Draggable"
          data-cypress="draggable-item"
          {...(handle ? {} : listeners)}
          tabIndex={handle ? -1 : undefined}
          onContextMenu={(e) => {
            onRightClick();
            e.preventDefault();
          }}
        >
          <DraggableEntity ability={ability} />
        </button>
      </div>
    );
  }
);
