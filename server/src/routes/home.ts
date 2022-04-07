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
    unique: boolean
  },
  duration: number,
}

type Req = {
  query: {
    length: number,
    unique: boolean
  }
}


router.get("/", (req, res) => {
  res.sendFile(path.resolve("../client/build", "index.html"));
});

router.get("/highscore", async (req, res) => {
  const response = await fetch("http://localhost:5080/api/highscore");
  const data = await response.json() as Data[];


  // Fråga
/*   const value: unknown = data;
  const dataChecked: Data[] = value as Data[]; */

  const length = parseInt(req.query.length as string)
  const unique = req.query.unique as string == "true"


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

  const menuActive = (path: String) => {
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
