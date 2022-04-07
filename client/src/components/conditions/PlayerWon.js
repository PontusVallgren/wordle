import { useState } from "react";
import Stopwatch from "../Stopwatch.js";

const PlayerWon = ({
  time,
  guessRows,
  gameData,
  handleGuess,
  handleSubmit,
}) => {
  const [inputText, setInputText] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  const onGuess = (e) => {
    handleGuess(e, inputText);
    setInputText("");
  };
  const duration =
    (new Date(gameData.result.endTime) - new Date(gameData.result.startTime)) /
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
        <form className='game-form' onSubmit={onGuess}>
          <input
            className='textInput'
            type='text'
            value={inputText}
            placeholder='Your name'
            onChange={onChange}
          />
          <button
            className='submit-hs primary'
            onClick={(e) => handleSubmit(e, inputText)}
          >
            Enter highscore
          </button>
        </form>
        <a href='/' className='new-game primary'>
          New Game
        </a>
      </div>
    </div>
  );
};

export default PlayerWon;
