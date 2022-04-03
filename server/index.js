import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", "./src/views");

const PORT = process.env.PORT || 5080;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
