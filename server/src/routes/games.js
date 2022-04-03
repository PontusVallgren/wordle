import express from "express";
import { randomize } from "../randomize.js";
import { compare } from "../compare.js";
import wordsData from "../words_dictionary.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const Games = [];

router.get("/", async (req, res) => {
  const game = {
    gameId: uuidv4(),
    guesses: [],
    correctWord: await randomize(wordsData, req.query.length, req.query.unique),
    startTime: new Date(),
    gameSettings: {
      length: req.query.length,
      unique: req.query.unique,
    },
  };

  Games.push(game);
  console.log(game);
  res.json({
    gameId: game.gameId,
  });
});

router.post("/guess", (req, res) => {
  const game = Games.find(
    (currentGame) => currentGame.gameId === req.body.gameId
  );
  const guess = compare(req.body.guess, game.correctWord);
  game.guesses.push(guess);

  if (req.body.guess.toUpperCase() == game.correctWord) {
    game.endTime = new Date();

    res.json({
      guesses: game.guesses,
      result: game,
      correct: true,
    });
  } else if (game.guesses.length >= 5) {
    game.endTime = new Date();

    res.json({
      guesses: game.guesses,
      result: game,
      correct: "lost",
    });
  } else {
    res.json({
      guesses: game.guesses,
      correct: false,
    });
  }
});

export default router;
