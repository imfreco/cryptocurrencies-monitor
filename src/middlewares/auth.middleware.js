const { ErrorHelper, JWTHelper } = require('../helpers');

module.exports = (req, res, next) => {
  let idToken = req.headers['authorization'];

  if (!idToken) {
    //user not identified, so, no authenticated
    ErrorHelper(401, 'La autenticación es requerida');
  }

  idToken = idToken.replace('Bearer ', '');

  JWTHelper.verifyToken(idToken, (err, payload) => {
    if (err) {
      //invalid id_token
      ErrorHelper(401, 'Token inválido');
    } else {
      const { user: id, name, lastname, coin } = payload;

      if (!id || !name || !lastname || !coin)
        //might it's a refresh token
        ErrorHelper(401, 'Token inválido');

      res.locals.user = { id, name, lastname, coin };
      next();
    }
  });
};
