import Stopwatch from "../Stopwatch.js";

const EndScreen = ({ time, guessRows, settings }) => {
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
};

export default EndScreen;
