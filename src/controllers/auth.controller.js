let _authService = null;

class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signIn(req, res) {
    const { username, password } = req.body;
    const token = await _authService.signIn(username, password);
    return res.send(token);
  }
}

module.exports = AuthController;
