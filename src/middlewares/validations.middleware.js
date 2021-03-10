const { validationResult } = require('express-validator');
const { ErrorHelper } = require('../helpers');

module.exports = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) ErrorHelper(400, errors.mapped());
  else next();
};
