import React from "react";
import CrosswordTile from "./CrosswordTile.tsx";
import styles from "./Crossword.module.scss";

type CrosswordProps = {
  name: string;
  size: number;
};

export default function Crossword({ name, size }: CrosswordProps) {
  const sizeArray = Array.from(Array(size).keys());
  return (
    <div className={styles["crossword-container"]}>
      <h1 className={styles["crossword-container__header"]}>
        This is crossword {name}
      </h1>

      {sizeArray.map((sx) => {
        console.log(sx)
        return <div key={sx} className={styles["crossword-tiles--horizontal"]}>
          {sizeArray.map((sy) => {
            console.log(sy)
            return <CrosswordTile key={sx + sy} />;
          })}
        </div>
      })}
    </div>
  );
}
