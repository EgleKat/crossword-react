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

function crosswordReducer(state: any, action: any) {
  const [activeValueX, activeValueY] = state.activeTile;
  switch (action.type) {
    case "setValue":
      const [posX, posY] = action.payload.place;
      console.log(posX, posY);
      return {
        ...state,
        values: [
          ...state.values,
          (state.values[posX][posY] = action.payload.value),
        ],
      };
    case "goLeft": {
      const newX = activeValueX - 1 >= 0 ? activeValueX - 1 : activeValueX;
      return {
        ...state,
        activeTile: [newX, activeValueY],
      };
    }
    case "goRight": {
      const newX =
        activeValueX + 1 <= state.size ? activeValueX + 1 : activeValueX;
      return {
        ...state,
        activeTile: [newX, activeValueY],
      };
    }
    case "size":
      return { ...state, size: action.payload.size };
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
  const state = {
    values: sizeArray.map((sx) => {
      return sizeArray.map((sy) => "");
    }),
    activeTile: [0, 0],
    size,
  };
  return state;
}

export default function Crossword({ name, size }: CrosswordProps) {
  const sizeArray = Array.from(Array(size).keys());
  const [crosswordValues, dispatch] = useReducer(
    crosswordReducer,
    initialiseEmptyState(size)
  );
  console.log(crosswordValues);
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
                  value={crosswordValues.values[sx]?.[sy] || ""}
                  setValue={setValue}
                  goLeft={() => dispatch({ type: "goLeft" })}
                  goRight={() => dispatch({ type: "goRight" })}
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
