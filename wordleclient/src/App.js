import React from "react";
import logo from './logo.svg';
import './App.css';
let secretwordlength = 8;
let secretwordtype = 1;

function App() {
  const [secretWord, setSecretWord] = React.useState(null);
  React.useEffect(() => {
    fetch("/api/" + secretwordlength + "/" + secretwordtype)
      .then((res) => res.json())
      .then((secretWord) => setSecretWord(secretWord));
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!secretWord ? "Loading..." : secretWord}</p>
      </header>
    </div>
  );
}

export default App;
