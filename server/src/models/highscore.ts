import mongoose from "mongoose";

const HighscoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guesses: { type: Array },
  settings: { type: Object },
  duration: { type: String },
});

const Highscore = mongoose.model("Highscore", HighscoreSchema);

export default Highscore;
