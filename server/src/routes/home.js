import express from "express";
import path from "path";
import fetch from "node-fetch";
import filterHighscore from "../utils/filter.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve("./src/frontend/game/build", "index.html"));
});

router.get("/highscore", async (req, res) => {
  const response = await fetch("http://localhost:5080/api/highscore");
  const data = await response.json();
  const filterData = filterHighscore(data, req);
  filterData.sort((a, b) => a.duration - b.duration);

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

  const menuActive = (path) => {
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
