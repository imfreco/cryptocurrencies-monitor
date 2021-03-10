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
}

module.exports = UserService;
