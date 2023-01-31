import React, { useEffect, useRef, useState } from "react";
import styles from "./CrosswordTile.module.scss";

type CrosswordTileProps = {
  setValue: setValueFunc;
  value: string;
  goLeft: Function;
  goRight: Function;
  goUp: Function;
  goDown: Function;
  isActive: boolean;
};
interface setValueFunc {
  (value: string): void;
}

export default function CrosswordTile({
  setValue,
  value,
  goLeft,
  goRight,
  isActive = false,
  goUp,
  goDown,
}: CrosswordTileProps) {
  const handleChange = (e: any) => {
    // Only allowing first letter
    const newValue = e.target.value[0] || "";
    // setLetter(newValue);
    setValue(newValue);
  };
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (isActive) inputRef?.current?.focus();
  }, [isActive]);

  const isActiveClass = isActive ? styles["crossword-tile--active"] : "";
  return (
    <input
      ref={inputRef}
      className={`${styles["crossword-tile"]} ${isActiveClass}`}
      type="text"
      onChange={handleChange}
      onKeyUp={(e) => {
        if (e.key === "ArrowLeft") {
          goLeft();
        } else if (e.key === "ArrowRight") {
          goRight();
        } else if (e.key === "ArrowUp") {
          goUp();
        } else if (e.key === "ArrowDown") {
          goDown();
        }
      }}
      value={value}
    ></input>
  );
}
