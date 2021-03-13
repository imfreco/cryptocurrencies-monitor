const { CoinTypes, UserSeeds } = require('../../../src/common');
const { CryptoProvider } = require('../../../src/providers');
const { CoinRepository } = require('../../../src/repositories');
const { CoinService, UserService } = require('../../../src/services');
const { ObjectsUtil } = require('../../../src/utils');

const mockUserSeed = { ...UserSeeds[0], id: 1 };
const coinId = 'bitcoin';
const mockInstance = { dataValues: { ...mockUserSeed } };
let mockDataObject = { symbol: 'abc' };
const mockData = [mockDataObject];
let mockFoundCoin = undefined;
const mockFind = jest.fn(() => mockFoundCoin);

jest.mock('../../../src/utils/objects.util.js', () => ({
  getSomeProperties: jest.fn((propsRequired, object) => object),
}));

jest.mock('../../../src/providers/coin-gecko.provider.js', () => ({
  getCoins: jest.fn(() => ({ data: mockData })),
  getCoin: jest.fn(() => ({ data: mockDataObject })),
}));

jest.mock('../../../src/repositories/coin.repository.js', () => ({
  getCoinsByUser: jest.fn(() => ({ find: mockFind })),
}));

jest.mock('../../../src/services/user.service.js', () => ({
  existsUser: jest.fn((id) => (id === mockUserSeed.id ? mockInstance : null)),
}));

describe('Pruebas al servicio de criptomonedas', () => {
  let _coinService = null;

  beforeAll(() => {
    _coinService = new CoinService({ UserService, CoinRepository });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll debe retornar todas las criptomonedas', async () => {
    const propsRequired = [
      'symbol',
      'current_price',
      'name',
      'image',
      'last_updated',
    ];
    const coin = CoinTypes[0];

    const res = await _coinService.getAll(coin);

    expect(CryptoProvider.getCoins).toHaveBeenCalledTimes(1);
    expect(ObjectsUtil.getSomeProperties).toHaveBeenCalledTimes(
      mockData.length,
    );
    expect(ObjectsUtil.getSomeProperties).toHaveBeenCalledWith(
      propsRequired,
      mockDataObject,
    );
    expect(res).toEqual(mockData);
  });

  test('hasCoin debe retornar false', async () => {
    const res = await _coinService.hasCoin(coinId, mockUserSeed.id);

    expect(CoinRepository.getCoinsByUser).toHaveBeenCalledTimes(1);
    expect(CoinRepository.getCoinsByUser).toHaveBeenCalledWith(mockUserSeed.id);
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(res).toBeFalsy();
  });

  test('hasCoin debe retornar error de criptomoneda ya agregada', async () => {
    mockFoundCoin = {};

    try {
      await _coinService.hasCoin(coinId, mockUserSeed.id);
    } catch (error) {
      expect(error.message).toBe('Esta criptomoneda ya ha sido agregada');
      expect(error.status).toBe(400);
    }

    expect(CoinRepository.getCoinsByUser).toHaveBeenCalledTimes(1);
    expect(CoinRepository.getCoinsByUser).toHaveBeenCalledWith(mockUserSeed.id);
    expect(mockFind).toHaveBeenCalledTimes(1);
  });

  test('existsCoin debe retornar true', async () => {
    const res = await _coinService.existsCoin(coinId);

    expect(CryptoProvider.getCoin).toHaveBeenCalledTimes(1);
    expect(CryptoProvider.getCoin).toHaveBeenCalledWith(coinId);

    expect(res).toBeTruthy();
  });

  test('existsCoin debe retornar error de no existencia de criptomoneda', async () => {
    mockDataObject['error'] = 'something';

    try {
      await _coinService.existsCoin(coinId);
    } catch (error) {
      expect(error.message).toBe('No existe la criptomoneda suministrada');
      expect(error.status).toBe(404);
    }

    expect(CryptoProvider.getCoin).toHaveBeenCalledTimes(1);
    expect(CryptoProvider.getCoin).toHaveBeenCalledWith(coinId);
  });

  xtest('assignToUser debe retornar todas las criptomonedas', async () => {
    const res = await _coinService.assignToUser(coinId, userId);

    expect(UserService.existsUser).toHaveBeenCalledTimes(1);
    expect(UserService.existsUser).toHaveBeenCalledWith(mockUserSeed.id);
    expect(CryptoProvider.getCoin).toHaveBeenCalledTimes(1);
    expect(CryptoProvider.getCoin).toHaveBeenCalledWith(mockUserSeed.id);
    expect(UserService.hasCoin).toHaveBeenCalledTimes(1);
    expect(UserService.existsCoin).toHaveBeenCalledTimes(1);
  });
});
