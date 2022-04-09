import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import routes from "./src/routes/routes";

const app = express();
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/", routes.home);

app.use("/api/highscore", routes.highscore);
app.use("/api/games", routes.games);

app.use(express.static("./src/static"));
app.use(express.static("../client/build"));

mongoose
  .connect(
    process.env.DB_URL || "asd"
  )
  .then(async () => {
    const PORT = process.env.PORT || 5080;
    app.listen(PORT, () => {
      console.log(`Our app is running on port ${PORT}`);
    });
  });
