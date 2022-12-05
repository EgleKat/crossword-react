import logo from './logo.svg';
import './App.css';
import Crossword from './Crossword/Crossword.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Crossword name={"Bob"} />
      </header>
    </div>
  );
}

export default App;
