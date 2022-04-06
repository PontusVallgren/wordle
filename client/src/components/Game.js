import { useState, useEffect } from "react";
import Guess from "./Guess.js";
import Stopwatch from "./Stopwatch.js";

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

  const handleGuess = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5080/api/games/guess`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: settings.gameId,
        guess: inputText,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5080/api/highscore`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        game: gameData,
        name: inputText,
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
    const duration =
      (new Date(gameData.result.endTime) -
        new Date(gameData.result.startTime)) /
      1000;
    return (
      <div className='container'>
        <a href='/' className='title'>
          Wordle
        </a>
        <Stopwatch time={time} />
        <div className='guess-ctn'>{guessRows}</div>
        <div className='result-info'>
          <h1>You won!</h1>
          <p>Guesses: {gameData.guesses.length}</p>
          <p>Duration: {Math.floor(duration)}s</p>
          <form className='game-form' onSubmit={handleGuess}>
            <input
              className='textInput'
              type='text'
              value={inputText}
              placeholder='Your name'
              onChange={onChange}
            />
            <button className='submit-hs primary' onClick={handleSubmit}>
              Enter highscore
            </button>
          </form>
          <a href='/' className='new-game primary'>
            New Game
          </a>
        </div>
      </div>
    );
  }

  if (gameState === "lost") {
    const duration =
      (new Date(gameData.result.endTime) -
        new Date(gameData.result.startTime)) /
      1000;
    return (
      <div className='container'>
        <a href='/' className='title'>
          Wordle
        </a>
        <Stopwatch time={time} />
        <div className='guess-ctn'>{guessRows}</div>
        <div className='result-info'>
          <h1>You lost!</h1>
          <p>Guesses: {gameData.guesses.length}</p>
          <p>Duration: {Math.floor(duration)}s</p>
          <a href='/' className='new-game primary'>
            New Game
          </a>
        </div>
      </div>
    );
  }

  if (gameState === "end") {
    return (
      <div className='container'>
        <a href='/' className='title'>
          Wordle
        </a>
        <Stopwatch time={time} />
        <div className='guess-ctn'>{guessRows}</div>
        <div className='result-info'>
          <h1>You submitted your highscore!</h1>
          <a
            href={`/highscore?length=${settings.wordLength}&unique=${settings.unique}`}
            className='hs-link primary'
          >
            Highscores
          </a>
          <a href='/' className='new-game primary'>
            New Game
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <a href='/' className='title'>
        Wordle
      </a>
      <Stopwatch time={time} />
      <div className='guess-ctn'>{guessRows}</div>
      <form className='game-form' onSubmit={handleGuess}>
        <input
          className='textInput'
          type='text'
          placeholder='Enter guess'
          value={inputText}
          onChange={onChange}
          maxLength={settings.wordLength}
          minLength={settings.wordLength}
          required
        />
        <button className='guess-btn primary'>GUESS</button>
      </form>
    </div>
  );
};

export default Game;
