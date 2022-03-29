import { useState, useEffect } from 'react';
import Game from "./components/Game/Game.js";
import Menu from "./components/Menu/Menu.js";
import './App.css';


function App() {
  const [gameId, setGameId] = useState(null);
  const [menuState, setMenuState] = useState("started");

  const GameSettingsHandler = setting => {
    const startGame = async () => {
      const res = await fetch("http://localhost:3001/api/game/" + setting.wordLength + "/" + setting.wordUniqueness, {
        method: "post",
      });
      const data = await res.json();
      setGameId(data.id);
      console.log(gameId)
    };
    startGame();
  }

  if (menuState === "started") {
    return (
      <div className="App">
        <Menu GameSettingsHandler={GameSettingsHandler} />
      </div>
    )
  }

  if (gameId) {
    return (
      <div className="App">
        <Game gameId={gameId} />
      </div>
    )
  } else {
    return (
      <div className="App">Loading...</div>
    )
  }

}

export default App;
