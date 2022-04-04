import mongoose from "mongoose";

const Schema = mongoose.Schema;

const highscoreSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    completionTime: {
        type: Number,
        require: true,
    },
    wordLength: {
        type: Number,
        require: true,
    },
    uniqueLetters: {
        type: String,
        require: true,
    },
});

const HighScore = mongoose.model("Highscore", highscoreSchema);

export default HighScore; 