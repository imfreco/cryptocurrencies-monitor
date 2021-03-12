const request = require('supertest');

const { UserSeeds } = require('../../../src/common');
const container = require('../../../src/startup/container');
const db = container.resolve('db');
const server = container.resolve('server');
const app = server.getApp();

describe('Pruebas de integración en el módulo de autenticación', () => {
  const baseUrl = '/v1/api';

  test('Debe retornar un token de identificación y uno de refresco con las credenciales correctas', async () => {
    const { username, password } = UserSeeds[0];

    const res = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ username, password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      id_token: expect.any(String),
      refresh_token: expect.any(String),
    });
  });

  test('Debe retornar un error con las credenciales incorrectas', async () => {
    const res = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ username: 'asdsadasd', password: 'asdasdasd' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      status: expect.any(Number),
      message: expect.any(String),
    });
  });

  test('Debe retornar un error con las credenciales incorrectas', async () => {
    const { username } = UserSeeds[0];

    const res = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ username, password: 'asdas' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      status: expect.any(Number),
      message: expect.any(Object),
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
