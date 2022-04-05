import express from "express";
import * as uuid from "uuid";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import fetch from "node-fetch"

import loadSecretWord from "./requestHandler.js";
import checkWord from "./checkWord.js";
import HighScore from "../../model/highscore.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import expressLayouts from "express-ejs-layouts";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

const app = express();
const uri = process.env.MONGODB_CONNECTION_STRING;

app.set("view engine", "ejs");
app.set("views", "./views")
app.use(expressLayouts)
app.set("layout", "./layouts/index")

app.use(express.static(__dirname + "/public"));

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDb database connection established succesfully");
});

app.use(cors());
app.use(express.json());

const GAMES = [];

app.post("/api/game/", async (req, res) => {
    const secretWord = await loadSecretWord(req.query.wordlength, req.query.unique);
    console.log(secretWord);
    const game = {
        secretWord: secretWord,
        guesses: [],
        feedback: [],
        id: uuid.v4(),
        startTime: new Date(),
        unique: req.query.unique
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

app.post("/api/highscore", async (req, res) => {
    try {
        const game = GAMES.find((savedGame) => savedGame.id == req.body.id);
        let uniqueAnswer;
        if (game) {
            if (game.unique === "0") {
                uniqueAnswer = "words with repeating letters"
            } else {
                uniqueAnswer = "words with unique letters"
            }
            const newHighScore = new HighScore({
                firstName: req.body.firstName,
                completionTime: (game.endTime - game.startTime) / 1000,
                wordLength: game.secretWord.length,
                uniqueLetters: uniqueAnswer,
                numberOfGuesses: game.guesses.length,
            });

            await HighScore.create(newHighScore);
            res.send("Highscore added");

        } else {
            res.status(404).end();
        }

    } catch (err) {
        console.log("error: ", err);
    }
})

app.get("/api/highscore", async (req, res) => {
    await HighScore.find({}, (err, result) => {
        console.log("highscore from db: ", result);
        res.send(result);
    })
})

app.get("/", async (req, res) => {
    const list = await HighScore.find().sort({ completionTime: 1 }).limit(20);
    res.render("highscore", { list, page_name: "highscore" });
});

app.use("/404", async (req, res) => {
    res.render("404", { page_name: "error" });
    res.status(404);
});

export default app;