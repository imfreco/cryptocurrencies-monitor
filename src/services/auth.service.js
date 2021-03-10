const { JWTHelper, ErrorHelper } = require('../helpers');

let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signIn(username, password) {
    const user = await _userService.getByUsername(username);

    if (!user?.isValidPassword(password))
      ErrorHelper(400, 'Credenciales inválidas');

    const {
      dataValues: { id, name, lastname, coin },
    } = user;

    const id_token = JWTHelper.signPayload(
      { user: id, name, lastname, coin },
      { expiresIn: JWTHelper.expirationTimes.idToken },
    );

    const refresh_token = JWTHelper.signPayload(
      { user: id },
      { expiresIn: JWTHelper.expirationTimes.refreshToken },
    );

    return { id_token, refresh_token };
  }
}

module.exports = AuthService;
