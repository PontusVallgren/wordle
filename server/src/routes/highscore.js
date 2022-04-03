import express from "express";
import Highscore from "../models/highscore.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const ladder = await Highscore.find();
  res.json(ladder);
});

router.post("/", (req, res) => {
  const duration =
    (new Date(req.body.game.result.endTime) -
      new Date(req.body.game.result.startTime)) /
    1000;
  const highscore = new Highscore({
    name: req.body.name,
    guesses: req.body.game.guesses,
    settings: req.body.game.result.gameSettings,
    duration: Math.floor(duration),
  });
  highscore.save();

  res.status(201).json(highscore);
});

export default router;
