const randomize = (words: string[], length: number, unique = false) => {
  const regex = /^(?:([A-Za-z])(?!.*\1))*$/;
  const wordList = words.filter((word) =>
    unique ? word.match(regex) && word.length == length : word.length == length
  );
  const result = wordList[Math.floor(Math.random() * wordList.length)];

  return wordList.length > 0 ? result : null;
};

export { randomize };
