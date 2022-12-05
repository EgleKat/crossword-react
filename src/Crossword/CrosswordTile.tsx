import React, { useState } from "react";
import styles from "./CrosswordTile.module.scss";

type CrosswordTileProps = {
  setValue: setValueFunc;
  value: string;
  goLeft: Function;
  goRight: Function;
  isActive: boolean;
};
interface setValueFunc {
  (value: string): null;
}

export default function CrosswordTile({
  setValue,
  value,
  goLeft,
  goRight,
  isActive = false,
}: CrosswordTileProps) {
  const handleChange = (e: any) => {
    // Only allowing first letter
    const newValue = e.target.value[0] || "";
    // setLetter(newValue);
    setValue(newValue);
  };

  const isActiveClass = isActive ? " crossword-tile--active" : "";
  return (
    <input
      className={styles["crossword-tile"] + isActiveClass}
      type="text"
      onChange={handleChange}
      onKeyUp={(e) => {
        if (e.key === "ArrowLeft") {
          goLeft();
        } else if (e.key === "ArrowRight") {
          goRight();
        }
      }}
      value={value}
    ></input>
  );
}
