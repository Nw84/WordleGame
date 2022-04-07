import { useState } from "react";
import "./Menu.css";

const Menu = ({ GameSettingsHandler, menuStateHandler }) => {
    const [enteredLength, setEnteredLength] = useState(4);
    const [enteredUniqueness, setEnteredUniqueness] = useState(0);

    const lengthChangeHandler = (event) => {
        setEnteredLength(event.target.value)
    }

    const uniqueChangeHandler = (event) => {
        setEnteredUniqueness(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const gameData = {
            wordLength: enteredLength,
            wordUniqueness: enteredUniqueness,
        }
        GameSettingsHandler(gameData)
        menuStateHandler("loading")
    };

    return (

        <div className="menu-container">
            <h2>Configure your game</h2>
            <form onSubmit={submitHandler}>
                <div className="letters-container">
                    <p>How many letters ?</p>
                    <select value={enteredLength} onChange={lengthChangeHandler} className="letterSelect">
                        <option value="4">Play with a 4-letter word</option>
                        <option value="5">Play with a 5-letter word</option>
                        <option value="6">Play with a 6-letter word</option>
                        <option value="7">Play with a 7-letter word</option>
                        <option value="8">Play with a 8-letter word</option>
                        <option value="9">Play with a 9-letter word</option>
                    </select>
                </div>
                <div className="unique-container" onChange={uniqueChangeHandler}>
                    <input type="radio" value="0" name="unique" defaultChecked />Allow repeating characters (e.g. HELLO)
                    <br />
                    <input type="radio" value="1" name="unique" />Allow unique characters only (e.g. CURLY)
                </div>
                <button type="submit" className="menuSubmit">Start Game</button>
            </form>
        </div >
    )
}

export default Menu; 