import { useState } from "react";
import "./Game.css";

const Game = ({ secretWord }) => {
    const [startTime] = useState(new Date());
    const [gameState, setGameState] = useState("playing");
    const [endTime, setEndtime] = useState(null);
    const [inputText, setInputText] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [name, setName] = useState("");

    const handleKeyUp = (keyCode) => {

    }


}

export default Game; 