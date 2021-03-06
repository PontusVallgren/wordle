type Data = {
  name: string,
  guesses: [],
  settings: {
    length: number,
    unique: string
  },
  duration: number,
}

const filterHighscore = (data: Data[], length: number, unique: string) => {
  let filter = [];
  if (length && unique == "true") {
    filter = data
      .filter((item) => item.settings.length == length)
      .filter((item) => item.settings.unique == unique)
      .sort((a, b) => a.duration - b.duration);

    return filter;
  }
  if (length) {
    filter = data
      .filter((item) => item.settings.length == length)
      .sort((a, b) => a.duration - b.duration);

    return filter;
  }

  if (unique == "true") {
    filter = data
      .filter((item) => item.settings.unique == unique)
      .sort((a, b) => a.duration - b.duration);
    return filter;
  }

  return data.sort((a, b) => a.duration - b.duration);
};

export default filterHighscore;
