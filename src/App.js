import logo from "./logo.svg";
import "./App.css";
import Crossword from "./Crossword/Crossword.tsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Crossword name={"Bob"} sizeY={8} sizeX={9} />
      </header>
    </div>
  );
}

export default App;
