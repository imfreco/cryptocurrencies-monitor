const BaseService = require('./base.service');
const { VSCurrencyTypes } = require('../common');
const { ErrorHelper } = require('../helpers');
const { CryptoProvider } = require('../providers');
const { ObjectsUtil } = require('../utils/');

let _userService = null,
  _coinRepository = null;

class CoinService extends BaseService {
  constructor({ UserService, CoinRepository }) {
    super(CoinRepository);
    _userService = UserService;
    _coinRepository = CoinRepository;
  }

  async getAll(coin) {
    const propsRequired = [
      'symbol',
      'current_price',
      'name',
      'image',
      'last_updated',
    ];

    const vsCurrency = VSCurrencyTypes.find((type) => type.coin === coin);
    const { data: coins } = await CryptoProvider.getCoins(vsCurrency.vs);

    return coins.map((coin) =>
      ObjectsUtil.getSomeProperties(propsRequired, coin),
    );
  }

  async assignToUser(coinId, userId) {
    const existsUser = await _userService.existsUser(userId);
    const existsCoin = await this.existsCoin(coinId);
    const hasCoin = await this.hasCoin(coinId, userId);

    if (existsUser && existsCoin && !hasCoin)
      return await _coinRepository.assignToUser(coinId, userId);
  }

  async hasCoin(coinId, userId) {
    const coins = await _coinRepository.getCoinsByUser(userId);

    const foundCoin = coins.find(({ dataValues: { id } }) => id === coinId);

    if (foundCoin) ErrorHelper(400, 'Esta criptomoneda ya ha sido agregada');
    else return false;
  }

  async existsCoin(coinId) {
    const {
      data: { error },
    } = await CryptoProvider.getCoin(coinId);

    if (error) ErrorHelper(404, 'No existe la criptomoneda suministrada');
    else return true;
  }

  async getTopCoinsByUser(userId, coin, limit, price = 'desc') {
    const propsRequired = [
      'symbol',
      'current_price',
      'name',
      'image',
      'last_updated',
    ];

    const existsUser = await _userService.existsUser(userId);

    if (existsUser) {
      let coinsByUser = await _coinRepository.getCoinsByUser(userId);

      if (coinsByUser.length === 0) return [];

      coinsByUser = coinsByUser.map(({ dataValues: { id } }) => id);

      const vsCurrency = VSCurrencyTypes.find((type) => type.coin === coin);
      let { data: coins } = await CryptoProvider.getCoins(
        vsCurrency.vs,
        coinsByUser,
        price,
      );

      coins = coins.slice(0, limit);
      return coins.map((coin) =>
        ObjectsUtil.getSomeProperties(propsRequired, coin),
      );
    }
  }
}

module.exports = CoinService;
