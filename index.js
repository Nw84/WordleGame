import express from "express";
import * as uuid from "uuid";
import cors from "cors";

import loadSecretWord from "./src/script/requestHandler.js";
import checkWord from "./src/script/checkWord.js";

const app = express();

app.use(cors());
app.use(express.json());

const GAMES = [];

app.post("/api/game/", async (req, res) => {
    const secretWord = await loadSecretWord(req.query.wordlength, req.query.unique);
    const game = {
        secretWord: secretWord,
        guesses: [],
        feedback: [],
        id: uuid.v4(),
        startTime: new Date()
    };
    GAMES.push(game);

    res.status(201).json({ id: game.id, wordLength: game.secretWord.length })
});

app.post("/api/game/:id/guesses", (req, res) => {
    const game = GAMES.find((savedGame) => savedGame.id == req.params.id);
    if (game) {
        const guess = checkWord(game.secretWord, req.body.guess)
        game.guesses.push(req.body.guess);
        game.feedback.push(guess)

        if (req.body.guess === game.secretWord) {
            game.endTime = new Date();

            res.status(201).json({
                guesses: game.guesses,
                result: game,
                correct: true,
            });
        } else {
            res.status(201).json({
                guesses: game.guesses,
                correct: false,
                feedback: game.feedback,
            });
        }
    } else {
        res.status(404).end();
    }
});

/*
app.get("/about", async (req, res) => {
    res.render("about");
});

app.use("/404", async (req, res) => {
    res.render("404");
    res.status(404);
});
*/

app.listen(3001);

export default app;