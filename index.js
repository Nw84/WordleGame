import express from "express";
import loadSecretWord from "./src/script/requestHandler.js";

const app = express();

app.get("/", async (req, res) => {
    res.send("Hello World")
    let data = await loadSecretWord();
    console.log(data)
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

app.listen(5080);

export default app;