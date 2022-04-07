import { useState } from "react";
import Stopwatch from "../Stopwatch.js";

const PlayingScreen = ({ time, guessRows, handleGuess, settings }) => {
  const [inputText, setInputText] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  const onGuess = (e) => {
    handleGuess(e, inputText);
    setInputText("");
  };
  return (
    <div className='container'>
      <a href='/' className='title'>
        Wordle
      </a>
      <Stopwatch time={time} />
      <div className='guess-ctn'>{guessRows}</div>
      <form className='game-form' onSubmit={onGuess}>
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

export default PlayingScreen;
