const { UserSeeds } = require('../../../src/common');
const { UserRepository } = require('../../../src/repositories');
const { UserService } = require('../../../src/services');

const mockUserSeed = { ...UserSeeds[0], id: 1 };
const mockInstance = { dataValues: { ...mockUserSeed } };

jest.mock('../../../src/repositories/user.repository.js', () => ({
  getByUsername: jest.fn((username) =>
    username === mockUserSeed.username ? mockInstance : null,
  ),
  getById: jest.fn((id) => (id === mockUserSeed.id ? mockInstance : null)),
}));

describe('Pruebas al servicio de usuarios', () => {
  let _userService = null;

  beforeAll(() => {
    _userService = new UserService({ UserRepository });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getByUsername debe retornar el usuario', async () => {
    const res = await _userService.getByUsername(mockUserSeed.username);

    expect(UserRepository.getByUsername).toHaveBeenCalledTimes(1);
    expect(UserRepository.getByUsername).toHaveBeenCalledWith(
      mockUserSeed.username,
    );
    expect(res).toEqual(mockInstance);
  });

  test('getByUsername debe retornar null', async () => {
    const wrongUsername = `a${mockUserSeed.username}a`;

    const res = await _userService.getByUsername(wrongUsername);

    expect(UserRepository.getByUsername).toHaveBeenCalledTimes(1);
    expect(UserRepository.getByUsername).toHaveBeenCalledWith(wrongUsername);
    expect(res).toBeNull();
  });

  test('existsUser debe retornar el usuario', async () => {
    const res = await _userService.existsUser(mockUserSeed.id);

    expect(UserRepository.getById).toHaveBeenCalledTimes(1);
    expect(UserRepository.getById).toHaveBeenCalledWith(mockUserSeed.id);
    expect(res).toBeTruthy();
  });

  test('existsUser debe arrojar un error', async () => {
    const wrongId = 2;

    try {
      await _userService.existsUser(wrongId);
    } catch (error) {
      expect(error.message).toBe('No existe el usuario suministrado');
      expect(error.status).toBe(404);
    }

    expect(UserRepository.getById).toHaveBeenCalledTimes(1);
    expect(UserRepository.getById).toHaveBeenCalledWith(wrongId);
  });
});
