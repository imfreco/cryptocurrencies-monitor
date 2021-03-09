const { validationResult } = require('express-validator');
const { errorHelper } = require('../helpers');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    errorHelper(400, errors.mapped());
  }
};
