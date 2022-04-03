const filterHighscore = (data, req) => {
  let filter = [];
  if (req.query.length && req.query.unique) {
    filter = data
      .filter((word) => word.settings.length == req.query.length)
      .filter((item) => item.settings.unique == req.query.unique);

    return filter;
  }
  if (req.query.length) {
    filter = data.filter((word) => word.settings.length == req.query.length);

    return filter;
  }

  if (req.query.unique) {
    filter = data.filter((word) => word.settings.unique == req.query.unique);
    return filter;
  }

  return data;
};

export default filterHighscore;
