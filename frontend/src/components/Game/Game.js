import { useState } from "react";
import "./Game.css";

const Game = ({ gameId, wordLength, menuStateHandler, highscoreUrl }) => {
    const [gameState, setGameState] = useState("playing");
    const [inputText, setInputText] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");


    const handleGuess = async (e) => {
        e.preventDefault();
        setInputText("");

        const res = await fetch(
            `http://localhost:5080/api/game/${gameId}/guesses`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ guess: inputText.toLocaleLowerCase() }),
            }
        );

        const data = await res.json();

        if (data.correct) {
            setResult(data.result);
            setGameState("won");
        }
        setGuesses(data.guesses);
        setFeedback(data.feedback);

    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        await fetch(`http://localhost:5080/api/highscore`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName: name, id: gameId }),
        });

        setGameState("end");
    };

    if (gameState === "won") {
        const duration =
            (new Date(result.endTime) - new Date(result.startTime)) / 1000 / 60;
        return (
            <div className="Game">
                <h1>You won!</h1>
                <p>The correct word was {guesses.at(-1)}</p>
                <p>Guesses: {guesses.length}</p>
                <p>Duration: {duration.toFixed(2)}min</p>
                <h2>Add to highscore</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        placeholder="Your name"
                        maxLength={20}
                    />
                    <input type="submit" />
                </form>
                <p>Or do you just want to play again ?</p>
                <button onClick={() => menuStateHandler("started")} className="guessSubmit">Play again</button>
            </div>
        );
    } else if (gameState === "end") {
        return (
            <div className="Game">
                <h1>Done!</h1>
                <a style={{ textdecoration: "none", fontWeight: "500", color: "inherit" }} href={"./highscore" + highscoreUrl}>
                    Check how you compared to others players with the same gamesettings.
                </a>
                <p>Do you want to play again ?</p>
                <button onClick={() => menuStateHandler("started")} className="guessSubmit">Play again</button>
            </div >
        );
    }

    return (
        <div className="Game">
            <form onSubmit={handleGuess}>
                <input
                    className="inputBox"
                    value={inputText}
                    onChange={(ev) => setInputText(ev.target.value)}
                    type="text"
                    maxLength={wordLength}
                    minLength={wordLength}
                    required={true}
                    style={{ width: wordLength * 40 + "px" }}
                />
                <div className="guessSubmit-container">
                    <button type="submit" className="guessSubmit">Guess</button>
                </div>
            </form>
            {feedback && [...feedback].reverse().map((item, i) => (
                <div className="rows" key={i}>
                    {item.map((obj, y) =>
                        <div key={y} className="row" style={{ backgroundColor: obj.result }}>
                            <p>{obj.letter}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

}

export default Game; 