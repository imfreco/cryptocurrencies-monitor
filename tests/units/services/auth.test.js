const { UserSeeds } = require('../../../src/common');
const { JWTHelper } = require('../../../src/helpers');
const { AuthService, UserService } = require('../../../src/services');

const mockUserSeed = { ...UserSeeds[0], id: 1 };
const mockJWT = 'eyA.eyB.CDE';
const mockExpirationTimes = { idToken: '5', refreshToken: '15' };

const mockIsValidPassword = jest.fn(
  (password) => password === mockUserSeed.password,
);

jest.mock('../../../src/services/user.service.js', () => ({
  getByUsername: jest.fn(() => ({
    dataValues: { ...mockUserSeed },
    isValidPassword: mockIsValidPassword,
  })),
}));

jest.mock('../../../src/helpers/jwt.helper.js', () => ({
  signPayload: jest.fn(() => mockJWT),
  expirationTimes: { idToken: '5', refreshToken: '15' },
}));

describe('Pruebas al servicio de autenticación', () => {
  let _authService = null;

  beforeAll(() => {
    _authService = new AuthService({ UserService });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('signIn debe retornar las credenciales', async () => {
    const res = await _authService.signIn(
      mockUserSeed.username,
      mockUserSeed.password,
    );

    expect(UserService.getByUsername).toHaveBeenCalledTimes(1);
    expect(UserService.getByUsername).toHaveBeenCalledWith(
      mockUserSeed.username,
    );
    expect(mockIsValidPassword).toHaveBeenCalledTimes(1);
    expect(mockIsValidPassword).toHaveBeenCalledWith(mockUserSeed.password);
    expect(JWTHelper.signPayload).toHaveBeenCalledTimes(2);
    expect(JWTHelper.signPayload).toHaveBeenNthCalledWith(
      1,
      {
        user: mockUserSeed.id,
        name: mockUserSeed.name,
        lastname: mockUserSeed.lastname,
        coin: mockUserSeed.coin,
      },
      { expiresIn: mockExpirationTimes.idToken },
    );
    expect(JWTHelper.signPayload).toHaveBeenNthCalledWith(
      2,
      { user: mockUserSeed.id },
      { expiresIn: mockExpirationTimes.refreshToken },
    );
    expect(res).toEqual({ id_token: mockJWT, refresh_token: mockJWT });
  });

  test('signIn debe retornar un error', async () => {
    const wrongPassword = `${mockUserSeed.password}1`;

    try {
      await _authService.signIn(mockUserSeed.username, wrongPassword);
    } catch (error) {
      expect(error.message).toBe('Credenciales inválidas');
      expect(error.status).toBe(400);
    }

    expect(UserService.getByUsername).toHaveBeenCalledTimes(1);
    expect(UserService.getByUsername).toHaveBeenCalledWith(
      mockUserSeed.username,
    );
    expect(mockIsValidPassword).toHaveBeenCalledTimes(1);
    expect(mockIsValidPassword).toHaveBeenCalledWith(wrongPassword);
    expect(JWTHelper.signPayload).toHaveBeenCalledTimes(0);
  });
});
