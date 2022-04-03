import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.js";
import Configure from "./components/Configure.js";
import Game from "./components/Game.js";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [settings, setSettings] = useState({
    wordLength: "4",
    unique: false,
    gameId: "",
  });
  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    setSettings((prevSettings) => {
      return {
        ...prevSettings,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleClickPlay = async () => {
    const res = await fetch(
      `http://localhost:5080/api/games?length=${settings.wordLength}&unique=${settings.unique}`
    );
    const data = await res.json();

    setSettings((prevSettings) => {
      return {
        ...prevSettings,
        gameId: data.gameId,
      };
    });

    setStartGame(!startGame);
  };

  if (startGame) {
    return (
      <>
        <Game settings={settings} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Configure
        handleChange={handleChange}
        config={settings}
        onPlay={handleClickPlay}
      />
    </>
  );
}

export default App;
