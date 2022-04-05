import { useState } from "react";
import "./Menu.css";

const Menu = (props) => {
    const [enteredLength, setEnteredLength] = useState(5);
    const [enteredUniqueness, setEnteredUniqueness] = useState(0);

    const lengthChangeHandler = (event) => {
        setEnteredLength(event.target.value)
    }

    const uniquenessChangeHandler = (event) => {
        setEnteredUniqueness(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const gameData = {
            wordLength: enteredLength,
            wordUniqueness: enteredUniqueness,
        }
        props.GameSettingsHandler(gameData)
    };

    return (

        <div className="menu-container">
            <h2>Please select your prefered game configuration</h2>
            <form onSubmit={submitHandler}>
                <select value={enteredLength} onChange={lengthChangeHandler}>
                    <option value="5">Play with a 5-letter word</option>
                    <option value="6">Play with a 6-letter word</option>
                    <option value="7">Play with a 7-letter word</option>
                    <option value="8">Play with a 8-letter word</option>
                    <option value="9">Play with a 9-letter word</option>
                </select>
                <select value={enteredUniqueness} onChange={uniquenessChangeHandler}>
                    <option value="0">Allow repeating characters (e.g. HELLO)</option>
                    <option value="1">Allow unique characters only (e.g. CURLY)</option>
                </select>
                <button type="submit">Start Game</button>
            </form>
        </div>
    )
}

export default Menu; 