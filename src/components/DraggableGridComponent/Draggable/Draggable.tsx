import React, { forwardRef } from "react";
import classNames from "classnames";
import type { DraggableSyntheticListeners, Translate } from "@dnd-kit/core";
import { Axis } from "../../../enums/Axis";
import styles from "./Draggable.module.css";
import { Ability } from "../../../types";
import DraggableEntity from "../../../pages/Encounter/SingleLane/DraggableEntity/DraggableEntity";

interface Props {
  axis?: Axis;
  dragOverlay?: boolean;
  dragging?: boolean;
  handle?: boolean;
  label?: string;
  listeners?: DraggableSyntheticListeners;
  style?: React.CSSProperties;
  translate?: Translate;
  ability: Ability;
  onRightClick: any;
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
          handle && styles.handle
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
            onRightClick(ability);
            e.preventDefault();
          }}
        >
          <DraggableEntity ability={ability} />
        </button>
      </div>
    );
  }
);
