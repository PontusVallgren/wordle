type Data = {
  name: string,
  guesses: [],
  settings: {
    length: number,
    unique: boolean
  },
  duration: number,
}

type Req = {
  query: {
    length: number,
    unique: boolean
  }
}

const filterHighscore = (data: Data[], length: number, unique: boolean) => {
  let filter = [];
  if (length && unique) {
    filter = data
      .filter((word) => word.settings.length == length)
      .filter((item) => item.settings.unique == unique)
      .sort((a, b) => a.duration - b.duration);

    return filter;
  }
  if (length) {
    filter = data
      .filter((word) => word.settings.length == length)
      .sort((a, b) => a.duration - b.duration);

    return filter;
  }

  if (unique) {
    filter = data
      .filter((word) => word.settings.unique == unique)
      .sort((a, b) => a.duration - b.duration);
    return filter;
  }

  return data.sort((a, b) => a.duration - b.duration);
};

export default filterHighscore;
