const BaseRepository = require('./base.repository');
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ db }) {
    _user = db['User'];
    super(_user);
  }
}

module.exports = UserRepository;
