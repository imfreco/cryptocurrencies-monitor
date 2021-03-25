let _coinService = null,
  _redisClient = null;

class CoinController {
  constructor({ CoinService, RedisClient }) {
    _coinService = CoinService;
    _redisClient = RedisClient;
  }

  async getAll(req, res) {
    const { coin } = res.locals.user;
    const coins = await _coinService.getAll(coin);
    return res.send(coins);
  }

  async assignToUser(req, res) {
    const { coinId, userId } = req.params;
    const coin = await _coinService.assignToUser(coinId, userId);
    return res.status(201).send(coin);
  }

  async getTopCoinsByUser(req, res) {
    const { coin } = res.locals.user;
    const { userId } = req.params;
    const { limit, price } = req.query;
    const topCoins = await _coinService.getTopCoinsByUser(
      userId,
      coin,
      limit,
      price,
    );

    _redisClient.setex('topCoins', 5, JSON.stringify(topCoins));

    return res.send(topCoins);
  }
}

module.exports = CoinController;
