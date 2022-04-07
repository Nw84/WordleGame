import { useState } from 'react';
import Game from "./components/Game/Game.js";
import Menu from "./components/Menu/Menu.js";
import Navbar from './components/Navbar/Navbar.js';
import './App.css';


function App() {
  const [gameId, setGameId] = useState(null);
  const [wordLength, setWordLength] = useState(null);
  const [menuState, setMenuState] = useState("started");
  const [highscoreUrl, setHighScoreUrl] = useState("");

  const GameSettingsHandler = setting => {
    setHighScoreUrl("/" + setting.wordLength + "/" + setting.wordUniqueness)
    const startGame = async () => {
      const res = await fetch("http://localhost:5080/api/game?wordlength=" + setting.wordLength + "&unique=" + setting.wordUniqueness, {
        method: "post",
      });
      const data = await res.json();
      setGameId(data.id);
      setWordLength(data.wordLength)
      setMenuState("playing")
    };
    startGame();
  }

  const menuStateHandler = input => {
    setMenuState(input)
  }


  if (menuState === "started") {
    return (
      <div className="App">
        <Navbar />
        <Menu GameSettingsHandler={GameSettingsHandler} menuStateHandler={menuStateHandler} />
      </div>
    )
  }

  if (gameId) {
    return (
      <div className="App">
        <Navbar />
        <Game gameId={gameId} wordLength={wordLength} menuStateHandler={menuStateHandler} highscoreUrl={highscoreUrl} />
      </div>
    )
  } else {
    return (
      <div className="App">
        <Navbar />
        <h4>Loading...</h4>
      </div>
    )
  }

}

export default App;
