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
}

module.exports = CoinController;
