const { VSCurrencyTypes } = require('../common');
const { getCoins } = require('../providers/coin-gecko.provider');
const { getSomeProperties } = require('../utils/objects.util');

class CoinService {
  constructor() {}

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
}

module.exports = CoinService;
