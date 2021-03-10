const { getCoins } = require('../providers/coin-gecko.provider');
const { getSomeProperties } = require('../utils/objects.util');

class CoinService {
  constructor() {}

  async getAll() {
    const propsRequired = [
      'symbol',
      'current_price',
      'name',
      'image',
      'last_updated',
    ];

    const { data: coins } = await getCoins();

    return coins.map((coin) => getSomeProperties(propsRequired, coin));
  }
}

module.exports = CoinService;
