import express from "express";
import * as uuid from "uuid";
import cors from "cors";

import loadSecretWord from "./src/script/requestHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

const GAMES = [];

app.post("/api/game/:secretwordlength/:secretwordtype", async (req, res) => {
    const game = {
        secretWord: loadSecretWord(req.params.secretwordlength, req.params.secretwordtype),
        guesses: [],
        id: uuid.v4(),
        startTime: new Date()
    };

    res.status(201).json({ id: game.id })
});

/*
app.get("/api/secretword/:secretwordlength/:unique", async (req, res) => {
    let data = await loadSecretWord(req.params.secretwordlength, req.params.unique);

    res.json({
        data: secretWord
    })
});

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