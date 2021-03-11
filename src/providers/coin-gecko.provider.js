const CoinGecko = require('coingecko-api');
const coinGeckoClient = new CoinGecko();

const addToFilterOptions = (vs_currency, ids, price) => {
  const filterOptions = {};

  if (vs_currency) filterOptions.vs_currency = vs_currency;

  if (ids && ids.length > 0) filterOptions.ids = ids;

  if (price) {
    let orderConstantPrice;

    if (price === 'desc') orderConstantPrice = CoinGecko.ORDER.PRICE_DESC;
    else orderConstantPrice = CoinGecko.ORDER.PRICE_ASC;

    filterOptions.order = orderConstantPrice;
  }

  return filterOptions;
};

const getCoins = async (vs_currency, ids, price) => {
  const filterOptions = addToFilterOptions(vs_currency, ids, price);

  return await coinGeckoClient.coins.markets(filterOptions);
};

const getCoin = async (coinId) => {
  return await coinGeckoClient.coins.fetch(coinId, {
    localization: false,
    developer_data: false,
    community_data: false,
    tickers: false,
  });
};

module.exports = { getCoins, getCoin, addToFilterOptions };
