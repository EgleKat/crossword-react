import React, { useState } from "react";
import styles from "./CrosswordTile.module.css";


export default function CrosswordTile({ }) {
  const [letter, setLetter] = useState("");

  const handleChange = e => {
    // Only allowing first letter
    const newValue = e.target.value[0] || "";
    setLetter(newValue);
  }

  return (
    <input className={styles["crossword-tile"]} type="text" onChange={handleChange} value={letter}>

    </input>
  )
}