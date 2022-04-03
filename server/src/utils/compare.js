const compare = (guess, correct) => {
  guess = Array.from(guess.toUpperCase());
  correct = Array.from(correct.toUpperCase());

  const checkCorrect = guess.map((word, index) => {
    if (word == correct[index]) {
      correct[index] = " ";
      guess[index] = " ";
      return {
        letter: word,
        result: "correct",
      };
    } else {
      return {
        letter: word,
        result: "",
      };
    }
  });

  const result = guess.map((word, index) => {
    if (word == " ") {
      return {
        letter: checkCorrect[index].letter,
        result: "correct",
      };
    } else if (correct.includes(word)) {
      correct[correct.indexOf(word)] = " ";
      return {
        letter: word,
        result: "misplaced",
      };
    } else {
      return {
        letter: word,
        result: "incorrect",
      };
    }
  });
  return result;
};

export { compare };
