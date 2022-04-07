import Stopwatch from "../Stopwatch.js";

const PlayerLost = ({ time, guessRows, gameData }) => {
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
        <h1>You lost!</h1>
        <p>Guesses: {gameData.guesses.length}</p>
        <p>Duration: {Math.floor(duration)}s</p>
        <a href='/' className='new-game primary'>
          New Game
        </a>
      </div>
    </div>
  );
};

export default PlayerLost;
