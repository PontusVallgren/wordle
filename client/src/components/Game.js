import { useState, useEffect } from "react";
import Guess from "./Guess.js";
import PlayingScreen from "./conditions/PlayingScreen.js";
import PlayerWon from "./conditions/PlayerWon.js";
import PlayerLost from "./conditions/PlayerLost.js";
import EndScreen from "./conditions/EndScreen.js";

const Game = ({ settings }) => {
  const [inputText, setInputText] = useState("");
  const [gameState, setGameState] = useState("playing");
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(true);
  const [gameData, setGameData] = useState();
  const [guesses, setGuesses] = useState({
    guesses: [
      {
        guess: Array(parseInt(settings.wordLength)).fill({ letter: null }),
      },
      {
        guess: Array(parseInt(settings.wordLength)).fill({ letter: null }),
      },
      {
        guess: Array(parseInt(settings.wordLength)).fill({ letter: null }),
      },
      {
        guess: Array(parseInt(settings.wordLength)).fill({ letter: null }),
      },
      {
        guess: Array(parseInt(settings.wordLength)).fill({ letter: null }),
      },
    ],
  });

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const handleGuess = async (e, text) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5080/api/games/guess`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: settings.gameId,
        guess: text || inputText,
      }),
    });
    const data = await res.json();

    const updatedGuesses = { ...guesses };
    updatedGuesses.guesses[data.guesses.length - 1].guess =
      data.guesses[data.guesses.length - 1];
    setGuesses({
      ...updatedGuesses,
    });

    if (data.correct) {
      setGameData(data);
      setGameState("won");
      setTimerOn(!timerOn);
    }

    if (data.correct === "lost") {
      setGameData(data);
      setGameState("lost");
    }
    setInputText("");
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  const handleSubmit = async (e, text) => {
    e.preventDefault();
    await fetch(`http://localhost:5080/api/highscore`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game: gameData,
        name: text,
      }),
    });
    setGameState("end");
  };

  const guessRows = guesses.guesses.map((item, index) => {
    return (
      <div key={index} className='guess-row'>
        <Guess data={item} />
      </div>
    );
  });

  if (gameState === "won") {
    return (
      <PlayerWon
        time={time}
        guessRows={guessRows}
        gameData={gameData}
        handleGuess={handleGuess}
        handleSubmit={handleSubmit}
      />
    );
  }

  if (gameState === "lost") {
    return <PlayerLost time={time} guessRows={guessRows} gameData={gameData} />;
  }

  if (gameState === "end") {
    return <EndScreen time={time} guessRows={guessRows} settings={settings} />;
  }

  return (
    <PlayingScreen
      time={time}
      guessRows={guessRows}
      settings={settings}
      handleGuess={handleGuess}
    />
  );
};

export default Game;
