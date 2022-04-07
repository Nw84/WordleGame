import express from "express";
import * as uuid from "uuid";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';

import loadSecretWord from "./src/script/requestHandler.js";
import checkWord from "./src/script/checkWord.js";
import HighScore from "./model/highscore.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
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

app.use(express.static(path.join(__dirname, '../frontend/build')));

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

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get("/highscore", async (req, res) => {
    const list = await HighScore.find().sort({ completionTime: 1 }).limit(20);
    res.render("highscore", { list, page_name: "highscore" });
});

app.get("/highscore/:wordlength/:unique", async (req, res) => {
    let list;
    console.log(req.params.unique)
    if (Number(req.params.unique) === 0) {
        list = await HighScore.find({ $and: [{ uniqueLetters: "words with repeating letters" }, { wordLength: req.params.wordlength }] }).sort({ completionTime: 1 }).limit(20);
        res.render("highscore", { list, page_name: "highscore" });
    } else if (Number(req.params.unique) === 1) {
        list = await HighScore.find({ $and: [{ uniqueLetters: "words with unique letters" }, { wordLength: req.params.wordlength }] }).sort({ completionTime: 1 }).limit(20);
        res.render("highscore", { list, page_name: "highscore" });
    } else {
        res.status(404).render("404", { page_name: "error" })
    }
});

app.get("/information", async (req, res) => {
    res.render("information", { page_name: "information" })
})

app.use((req, res) => {
    res.status(404).render("404", { page_name: "error" })
});

export default app;