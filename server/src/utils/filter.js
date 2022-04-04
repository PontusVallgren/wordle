const filterHighscore = (data, req) => {
  let filter = [];
  if (req.query.length && req.query.unique) {
    filter = data
      .filter((word) => word.settings.length == req.query.length)
      .filter((item) => item.settings.unique == req.query.unique)
      .sort((a, b) => a.duration - b.duration);

    return filter;
  }
  if (req.query.length) {
    filter = data
      .filter((word) => word.settings.length == req.query.length)
      .sort((a, b) => a.duration - b.duration);

    return filter;
  }

  if (req.query.unique) {
    filter = data
      .filter((word) => word.settings.unique == req.query.unique)
      .sort((a, b) => a.duration - b.duration);
    return filter;
  }

  return data.sort((a, b) => a.duration - b.duration);
};

export default filterHighscore;
