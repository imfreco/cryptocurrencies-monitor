const { ErrorHelper } = require('../helpers');

module.exports = (req, res, next) =>
  res.locals.user.id === req.params.userId
    ? next()
    : ErrorHelper(403, 'No tiene permisos suficientes');
