let _coinService = null;

class CoinController {
  constructor({ CoinService }) {
    _coinService = CoinService;
  }

  async getAll(req, res) {
    const coins = await _coinService.getAll();
    return res.send(coins);
  }
}

module.exports = CoinController;
