import React, { useState } from "react";
import styles from "./CrosswordTile.module.scss";

type CrosswordTileProps = {
  setValue: setValueFunc;
  value: string;
};

interface setValueFunc {
  (value: string): null;
}

export default function CrosswordTile({ setValue, value }: CrosswordTileProps) {
  const [letter, setLetter] = useState("");

  const handleChange = (e: any) => {
    // Only allowing first letter
    const newValue = e.target.value[0] || "";
    // setLetter(newValue);
    setValue(newValue);
  };

  return (
    <input
      className={styles["crossword-tile"]}
      type="text"
      onChange={handleChange}
      value={value}
    ></input>
  );
}
