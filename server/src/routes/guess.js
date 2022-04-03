import express from "express";

const router = express.Router();

/* router.post("/", async (req, res) => {
  const correct = await Keyword.find({ _id: req.body.key });
  if (correct[0].requests < 5) {
    await Keyword.updateOne(
      { _id: req.body.key },
      { $set: { requests: correct[0].requests + 1 } }
    );
    const guess = await compare(req.body.guess, correct[0].word);
    res.json(guess);
  } else {
    await Keyword.deleteOne({ _id: req.body.key });
    res.json("You lost");
  }
}); */

export default router;
