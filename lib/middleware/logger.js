'use strict';

module.exports = (req, res, next) => {
  console.log('method is', req.method ,'\nPath is', req.path , '\nrequest time is', req.requestTime);
  next();
};
