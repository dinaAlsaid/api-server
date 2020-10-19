'use strict';

module.exports = (err, req, res, next) => {
  res.status(404);
  res.statusMessage = '404/Not Found';
  res.send({ error: err.message });
};
