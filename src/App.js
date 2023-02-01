import logo from "./logo.svg";
import "./App.css";
import Crossword from "./Crossword/Crossword.tsx";

const NUMBER_TILE = "number";
const EMPTY = "";
const BLACK_TILE = "black";
const crosswordValues = [
  [BLACK_TILE, BLACK_TILE, NUMBER_TILE, BLACK_TILE, BLACK_TILE, BLACK_TILE, BLACK_TILE, BLACK_TILE], // col 1
  [NUMBER_TILE, EMPTY, EMPTY, EMPTY, BLACK_TILE, BLACK_TILE, NUMBER_TILE, BLACK_TILE], // col 2
  [BLACK_TILE, BLACK_TILE, EMPTY, NUMBER_TILE, EMPTY, EMPTY, EMPTY, BLACK_TILE], // col 3
  [BLACK_TILE, BLACK_TILE, EMPTY, BLACK_TILE, BLACK_TILE, NUMBER_TILE, EMPTY, BLACK_TILE], // col 4
  [BLACK_TILE, NUMBER_TILE, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, NUMBER_TILE], // col 5
  [BLACK_TILE, BLACK_TILE, EMPTY, BLACK_TILE, NUMBER_TILE, EMPTY, BLACK_TILE, EMPTY], // col 6
  [NUMBER_TILE, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY], // col 7
  [BLACK_TILE, BLACK_TILE, EMPTY, BLACK_TILE, EMPTY, BLACK_TILE, BLACK_TILE, BLACK_TILE], // col 8
  [BLACK_TILE, BLACK_TILE, NUMBER_TILE, EMPTY, EMPTY, EMPTY, EMPTY, BLACK_TILE], // col 9

];
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Crossword name={"Bob"} sizeY={8} sizeX={9} crosswordTemplate={crosswordValues} />
      </header>
    </div>
  );
}

export default App;
