import logo from "./logo.svg";
import "./App.css";
import Crossword from "./Crossword/Crossword.tsx";

export const BLACK_TILE = "black";
const crosswordValues = [
  [{ value: null }, { value: BLACK_TILE }, { value: null }, { value: null }, { value: null }, { value: null }, { value: BLACK_TILE }, { value: null }, { value: null }]

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
