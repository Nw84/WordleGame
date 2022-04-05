import { useState } from "react";
import "./Game.css";

const Game = ({ gameId, wordLength }) => {
    const [gameState, setGameState] = useState("playing");
    const [inputText, setInputText] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");

    const handleKeyUp = async (keyCode) => {
        if (keyCode === "Enter") {
            setInputText("");

            const res = await fetch(
                `http://localhost:5080/api/game/${gameId}/guesses`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ guess: inputText }),
                }
            );

            const data = await res.json();

            if (data.correct) {
                setResult(data.result);
                setGameState("won");
            }

            setGuesses(data.guesses);
            setFeedback(data.feedback);
        }
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
            (new Date(result.endTime) - new Date(result.startTime)) / 1000;
        return (
            <div className="Game">
                <h1>You won!</h1>
                <p>The correct word was {guesses.at(-1)}</p>
                <p>Guesses: {guesses.length}</p>
                <p>Duration: {duration}s</p>
                <h2>Add to highscore</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        placeholder="Your name"
                    />
                    <input type="submit" />
                </form>
            </div>
        );
    } else if (gameState === "end") {
        return (
            <div className="Game">
                <h1>Done!</h1>
            </div>
        );
    }

    return (
        <div className="Game">
            <input
                className="inputBox"
                value={inputText}
                onChange={(ev) => setInputText(ev.target.value)}
                onKeyUp={(ev) => handleKeyUp(ev.code)}
                type="text"
                maxLength={wordLength}
                minLength={wordLength}
            />
            {feedback.map((item, i) => (
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