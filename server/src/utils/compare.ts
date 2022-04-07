const compare = (guess: string, correct: string) => {
  const guessArr = Array.from(guess.toUpperCase());
  const correctArr = Array.from(correct.toUpperCase());

  const checkCorrect = guessArr.map((word, index) => {
    if (word == correctArr[index]) {
      correctArr[index] = " ";
      guessArr[index] = " ";
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

  const result = guessArr.map((word, index) => {
    if (word == " ") {
      return {
        letter: checkCorrect[index].letter,
        result: "correct",
      };
    } else if (correctArr.includes(word)) {
      correctArr[correctArr.indexOf(word)] = " ";
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
