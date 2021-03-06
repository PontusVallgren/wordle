import express from "express";
import path from "path";
import fetch from "node-fetch";
import filterHighscore from "../utils/filter";

const router = express.Router();

type Data = {
  name: string,
  guesses: [],
  settings: {
    length: number,
    unique: string
  },
  duration: number,
}


router.get("/", (req, res) => {
  res.sendFile(path.resolve("../client/build", "index.html"));
});

router.get("/highscore", async (req, res) => {
  const response = await fetch(`http://localhost:5080/api/highscore`);
  const data = await response.json() as Data[];
  
  const length = parseInt(req.query.length as string)
  const unique = req.query.unique as string

  const filterData = filterHighscore(data, length, unique);

  const navbar = [
    {
      title: "Game",
      link: "/",
    },
    {
      title: "Highscore",
      link: "/highscore",
    },
    {
      title: "Info",
      link: "/info",
    },
  ];

  const menuActive = (path: string) => {
    const nav = navbar.map((item) => {
      return {
        title: item.title,
        link: item.link,
        active: item.link == path,
      };
    });
    return nav;
  };

  res.render("highscore", {
    menu: menuActive(req.path),
    highscore: filterData,
  });
});

router.get("/info", (req, res) => {
  res.sendFile(path.resolve("./src/static", "info.html"));
});

export default router;
