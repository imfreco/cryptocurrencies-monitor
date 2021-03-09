let _userService = null;

class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async create(req, res) {
    const { body } = req;
    const createdUser = await _userService.create(body);
    return res.status(201).send(createdUser);
  }
}

module.exports = UserController;
