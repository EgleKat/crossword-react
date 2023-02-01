import { useReducer, useState } from "react";
import styles from "./Crossword.module.scss";
import CrosswordTile from "./CrosswordTile";
import { crosswordValues } from "../crosswordTemplates";
import { NUMBER_DOWN, NUMBER_RIGHT, BLACK_TILE } from "../crosswordTemplates";
type CrosswordProps = {
  name: string;
  sizeX: number;
  sizeY: number;
  crosswordTemplate: [];
};

interface setValueFunc {
  (value: string): null;
}

function crosswordReducer(state: any, action: any) {
  const [activeValueX, activeValueY] = state.activeTile;
  switch (action.type) {
    case "setValue":
      const correctValueArray = checkCorrectAnswers(state.values);
      const [posX, posY] = action.payload.place;
      const newValues = [...state.values];
      newValues[posX][posY] = action.payload.value;
      return {
        ...state,
        correctValueArray,
        values: newValues,
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
        activeValueX + 1 <= state.sizeX - 1 ? activeValueX + 1 : activeValueX;
      return {
        ...state,
        activeTile: [newX, activeValueY],
      };
    }
    case "goUp": {
      const newY = activeValueY - 1 >= 0 ? activeValueY - 1 : activeValueY;
      return {
        ...state,
        activeTile: [activeValueX, newY],
      };
    }
    case "goDown": {
      const newY =
        activeValueY + 1 <= state.sizeY - 1 ? activeValueY + 1 : activeValueY;
      return {
        ...state,
        activeTile: [activeValueX, newY],
      };
    }
    case "sizeX":
      return { ...state, size: action.payload.sizeX };
    case "sizeY":
      return { ...state, size: action.payload.sizeY };
    default:
      throw new Error();
  }
}

/**
 * Initializes the crossword array with empty values
 * @param sizeX size of each array in each row X
 * @param sizeY size of each array in each row Y
 * @param crosswordTemplate template with all the expected values
 * @returns empty string array of certain size
 */
function initialiseEmptyState(
  sizeX: number,
  sizeY: number,
  crosswordTemplate: []
) {
  const sizeXArray = Array.from(Array(sizeX).keys());
  const sizeYArray = Array.from(Array(sizeY).keys());
  const state = {
    values: sizeXArray.map((sx) => {
      return sizeYArray.map((sy) => "");
    }),
    activeTile: [0, 0],
    sizeX,
    sizeY,
    crosswordTemplate,
    correctValueArray: [],
  };
  return state;
}

function checkCorrectAnswers(values: []) {
  let correctWordCoords: any = [];
  // go through each word
  crosswordValues.forEach((col, y) => {
    col.forEach((tile, x) => {
      if (tile === NUMBER_DOWN) {
        const currentCorrectWordCoords: any = [];
        for (let i = x + 1; i < col.length; i++) {
          if (col[i] === values[y][i]) {
            // all good continue
            currentCorrectWordCoords.push([i, y]);
          } else if (col[i] === BLACK_TILE) {
            // word CORRECT
            correctWordCoords = [
              ...correctWordCoords,
              ...currentCorrectWordCoords,
            ];
            break;
          } else {
            // word INCORRECT
            currentCorrectWordCoords.length = 0;
          }
        }
      } else if (tile === NUMBER_RIGHT) {
        const currentCorrectWordCoords: any = [];
        for (let i = y + 1; i < crosswordValues.length; i++) {
          if (crosswordValues[i][x] === values[i][x]) {
            // all good continue
            currentCorrectWordCoords.push([x, i]);
          } else if (crosswordValues[i][x] === BLACK_TILE) {
            // word CORRECT
            correctWordCoords = [
              ...correctWordCoords,
              ...currentCorrectWordCoords,
            ];
            break;
          } else {
            // word INCORRECT
            currentCorrectWordCoords.length = 0;
          }
        }
      }
    });
  });

  return correctWordCoords;
}
export default function Crossword({
  name,
  sizeX,
  sizeY,
  crosswordTemplate,
}: CrosswordProps) {
  const sizeXArray = Array.from(Array(sizeX).keys());
  const sizeYArray = Array.from(Array(sizeY).keys());
  const [crosswordValues, dispatch] = useReducer(
    crosswordReducer,
    initialiseEmptyState(sizeX, sizeY, crosswordTemplate)
  );
  return (
    <div className={styles["crossword-container"]}>
      <h1 className={styles["crossword-container__header"]}>
        This is crossword "{name}"
      </h1>

      {sizeYArray.map((sy) => {
        return (
          <div key={sy} className={styles["crossword-tiles--horizontal"]}>
            {sizeXArray.map((sx) => {
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
                  goUp={() => dispatch({ type: "goUp" })}
                  goDown={() => dispatch({ type: "goDown" })}
                  key={sx + sy}
                  isInactive={crosswordTemplate[sx]?.[sy] === BLACK_TILE}
                  isNumber={
                    crosswordTemplate[sx]?.[sy] === NUMBER_DOWN ||
                    crosswordTemplate[sx]?.[sy] === NUMBER_RIGHT
                  }
                  isActive={
                    crosswordValues.activeTile[0] === sx &&
                    crosswordValues.activeTile[1] === sy
                  }
                  isCorrect={
                    !!crosswordValues.correctValueArray.find(
                      ([x, y]: [number, number]) => {
                        return x === sy && y === sx;
                      }
                    )
                  }
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
