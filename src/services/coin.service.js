const BaseService = require('./base.service');
const { VSCurrencyTypes } = require('../common');
const { getCoins, getCoin } = require('../providers/coin-gecko.provider');
const { ErrorHelper } = require('../helpers');
const { getSomeProperties } = require('../utils/objects.util');

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
    const { data: coins } = await getCoins(vsCurrency.vs);

    return coins.map((coin) => getSomeProperties(propsRequired, coin));
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

    if (foundCoin) ErrorHelper(400, 'Esa criptomoneda ya la posee');
    else return false;
  }

  async existsCoin(coinId) {
    const {
      data: { error },
    } = await getCoin(coinId);

    if (error) ErrorHelper(400, 'No existe la criptomenda suministrada');
    else return true;
  }
}

module.exports = CoinService;
