const CoinGecko = require('coingecko-api');
const coinGeckoClient = new CoinGecko();

const getCoins = async (vs_currency) => {
  return await coinGeckoClient.coins.markets({ vs_currency });
};

module.exports = {
  getCoins,
};
