import { useReducer, useState } from "react";
import styles from "./Crossword.module.scss";
import CrosswordTile from "./CrosswordTile.tsx";

type CrosswordProps = {
  name: string;
  size: number;
};

interface setValueFunc {
  (value: string): null;
}

function crosswordValueReducer(state: any, action: any) {
  switch (action.type) {
    case "setValue":
      const [posX, posY] = action.payload.place;
      console.log(posX, posY);
      return [...state, (state[posX][posY] = action.payload.value)];
    default:
      throw new Error();
  }
}

/**
 * Initializes the crossword array with empty values
 * @param size size of each array in each row
 * @returns empty string array of certain size
 */
function initialiseEmptyState(size: number) {
  const sizeArray = Array.from(Array(size).keys());
  return sizeArray.map((sx) => {
    return sizeArray.map((sy) => "");
  });
}

export default function Crossword({ name, size }: CrosswordProps) {
  const sizeArray = Array.from(Array(size).keys());
  const [crosswordValues, dispatch] = useReducer(
    crosswordValueReducer,
    initialiseEmptyState(size)
  );
  console.log(crosswordValues);
  const [activeTile, setActiveTile] = useState([0, 0]);
  return (
    <div className={styles["crossword-container"]}>
      <h1 className={styles["crossword-container__header"]}>
        This is crossword {name}
      </h1>

      {sizeArray.map((sx) => {
        return (
          <div key={sx} className={styles["crossword-tiles--horizontal"]}>
            {sizeArray.map((sy) => {
              const setValue = (value: string) =>
                dispatch({
                  type: "setValue",
                  payload: {
                    value: value,
                    place: [sx, sy],
                  },
                });
              return (
                <CrosswordTile
                  value={crosswordValues[sx][sy]}
                  setValue={setValue}
                  key={sx + sy}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
