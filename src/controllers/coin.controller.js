let _coinService = null;

class CoinController {
  constructor({ CoinService }) {
    _coinService = CoinService;
  }

  async getAll(req, res) {
    const { coin } = res.locals.user;
    const coins = await _coinService.getAll(coin);
    return res.send(coins);
  }

  async assignToUser(req, res) {
    const { coinId, userId } = req.params;
    const coin = await _coinService.assignToUser(coinId, userId);
    return res.send(coin);
  }
}

module.exports = CoinController;
