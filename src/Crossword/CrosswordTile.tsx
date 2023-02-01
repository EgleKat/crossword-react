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
  isNumber: boolean;
  isInactive: boolean;
  isCorrect: boolean;
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
  isNumber,
  isInactive,
  isCorrect,
}: CrosswordTileProps) {
  const handleChange = (e: any) => {
    // Only using one letter
    const newValue = e.key[0] || "";
    // setLetter(newValue);
    setValue(newValue);
  };
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (isActive) inputRef?.current?.focus();
  }, [isActive]);

  const isActiveClass = isActive ? styles["crossword-tile--active"] : "";
  const isBlackClass = isInactive ? styles["crossword-tile--black"] : "";
  const isNumberClass = isNumber ? styles["crossword-tile__number"] : "";
  const isCorrectClass = isCorrect ? styles["crossword-tile--correct"] : "";
  return (
    <input
      ref={inputRef}
      className={`${styles["crossword-tile"]} ${isActiveClass} ${isBlackClass} ${isNumberClass} ${isCorrectClass}`}
      type="text"
      // onChange={handleChange}
      onKeyUp={(e) => {
        if (e.key === "ArrowLeft") {
          goLeft();
        } else if (e.key === "ArrowRight") {
          goRight();
        } else if (e.key === "ArrowUp") {
          goUp();
        } else if (e.key === "ArrowDown") {
          goDown();
        } else {
          handleChange(e);
        }
      }}
      value={value}
    ></input>
  );
}
