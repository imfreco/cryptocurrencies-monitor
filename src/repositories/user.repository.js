const BaseRepository = require('./base.repository');
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ db }) {
    _user = db['User'];
    super(_user);
  }

  async getByUsername(username) {
    return await _user.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { username },
    });
  }
}

module.exports = UserRepository;
