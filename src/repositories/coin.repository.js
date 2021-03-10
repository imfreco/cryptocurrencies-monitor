const BaseRepository = require('./base.repository');
let _coin = null,
  _user = null,
  _userCoin = null,
  _sequelize = null,
  _Sequelize = null;

class CoinRepository extends BaseRepository {
  constructor({ db }) {
    _coin = db['Coin'];
    _user = db['User'];
    _userCoin = db['UserCoin'];
    _sequelize = db.sequelize;
    _Sequelize = db.Sequelize;
    super(_coin);
  }

  async getCoinsByUser(userId) {
    return await _coin.findAll({
      include: {
        model: _user,
        where: { id: userId },
      },
    });
  }

  async assignToUser(coinId, userId) {
    let transaction;
    try {
      transaction = await _sequelize.transaction({
        isolationLevel: _Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      });

      let coinSaved = await this.get(coinId);

      if (!coinSaved)
        coinSaved = await _coin.create({ id: coinId }, { transaction });

      if (coinSaved) {
        const userCoinSaved = await _userCoin.create(
          { userId, coinId },
          { transaction },
        );

        if (userCoinSaved) {
          await transaction.commit();
          return userCoinSaved;
        }
      }
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      throw error;
    }
  }
}

module.exports = CoinRepository;
