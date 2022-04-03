const Guess = ({ data }) => {
  const guessBox = data.guess.map((letter, index) => {
    return (
      <div key={index} className={`guess-box ${letter.result}`}>
        {letter.letter}
      </div>
    );
  });
  return guessBox;
};

export default Guess;
