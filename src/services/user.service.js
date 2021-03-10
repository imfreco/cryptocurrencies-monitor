const { ErrorHelper } = require('../helpers');
const BaseService = require('./base.service');
let _userRepository = null;

class UserService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    _userRepository = UserRepository;
  }

  async getByUsername(username) {
    return await _userRepository.getByUsername(username);
  }

  async existsUser(userId) {
    const user = await _userRepository.getById(userId);

    if (user) return true;
    else ErrorHelper(400, 'No existe el usuario suministrado');
  }
}

module.exports = UserService;
