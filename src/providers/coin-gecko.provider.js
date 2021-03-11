const CoinGecko = require('coingecko-api');
const coinGeckoClient = new CoinGecko();

const getCoins = async (vs_currency, ids, price) => {
  const options = {
    vs_currency,
  };
  if (ids) options.ids = ids;

  if (price) {
    let orderConstantPrice;

    if (price === 'desc') orderConstantPrice = CoinGecko.ORDER.PRICE_DESC;
    else orderConstantPrice = CoinGecko.ORDER.PRICE_ASC;

    options.order = orderConstantPrice;
  }

  return await coinGeckoClient.coins.markets(options);
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
