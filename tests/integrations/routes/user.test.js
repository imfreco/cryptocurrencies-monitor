const request = require('supertest');

const { UserSeeds } = require('../../../src/common');
const container = require('../../../src/startup/container');
const db = container.resolve('db');
const server = container.resolve('server');
const app = server.getApp();

describe('Pruebas de integración en el módulo de usuarios', () => {
  const baseUrl = '/v1/api';

  beforeAll(async () => {
    await db.sequelize.authenticate();
  });

  describe('Pruebas al endpoint de consulta top N de criptomonedas', () => {
    const { username, password } = UserSeeds[0];
    let id_token = null;

    beforeAll(async () => {
      const res = await request(app)
        .post(`${baseUrl}/auth/signin`)
        .send({ username, password });

      id_token = res.body.id_token;
    });

    test('Debe retornar error de autenticación', async () => {
      const userId = 1;
      const res = await request(app).get(
        `${baseUrl}/users/${userId}/coins/top`,
      );

      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        status: expect.any(Number),
        message: expect.any(String),
      });
    });

    test('Debe retornar error de autorización', async () => {
      const userId = 2;
      const res = await request(app)
        .get(`${baseUrl}/users/${userId}/coins/top`)
        .set('Authorization', `Bearer ${id_token}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toEqual({
        status: expect.any(Number),
        message: expect.any(String),
      });
    });

    test('Debe retornar error por falta de parametro "limit"', async () => {
      const userId = 1;
      const res = await request(app)
        .get(`${baseUrl}/users/${userId}/coins/top`)
        .set('Authorization', `Bearer ${id_token}`);

      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({
        status: expect.any(Number),
        message: expect.any(Object),
      });
    });

    test('Debe retornar top N de criptomonedas según el parametro limit"', async () => {
      const userId = 1;
      const limit = 3;
      const res = await request(app)
        .get(`${baseUrl}/users/${userId}/coins/top`)
        .set('Authorization', `Bearer ${id_token}`)
        .query({ limit: 3 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.any(Array));
      expect(res.body.length).toBeLessThanOrEqual(limit);
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
