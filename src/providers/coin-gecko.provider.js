const CoinGecko = require('coingecko-api');
const coinGeckoClient = new CoinGecko();

const getCoins = async (vs_currency) => {
  return await coinGeckoClient.coins.markets({ vs_currency });
};

const getCoin = async (coinId) => {
  return await coinGeckoClient.coins.fetch(coinId, {
    localization: false,
    developer_data: false,
    community_data: false,
    tickers: false,
  });
};

module.exports = { getCoins, getCoin };
