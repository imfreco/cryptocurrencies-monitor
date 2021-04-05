const request = require('supertest');

const { UserSeeds } = require('../../../src/common');
const container = require('../../../src/startup/container');
const db = container.resolve('db');
const server = container.resolve('server');
const app = server.getApp();

describe('Pruebas de integración en el módulo de criptomonedas', () => {
  const baseUrl = '/v1/api';

  const { username, password } = UserSeeds[0];
  let id_token = null;

  beforeAll(async () => {
    await db.sequelize.authenticate();

    const res = await request(app)
      .post(`${baseUrl}/auth/signin`)
      .send({ username, password });

    id_token = res.body.id_token;
  });

  describe('Pruebas al endpoint de consulta de criptomonedas', () => {
    test('Debe retornar error de autenticación', async () => {
      const res = await request(app).get(`${baseUrl}/coins`);

      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        status: expect.any(Number),
        message: expect.any(String),
      });
    });

    test('Debe retornar las criptomonedas variando su precio según el usuario autenticado', async () => {
      const res2 = await request(app)
        .get(`${baseUrl}/coins`)
        .set('Authorization', `Bearer ${id_token}`);

      expect(res2.statusCode).toBe(200);
      expect(res2.body).toEqual(expect.any(Array));
    });

    test('Debe retornar error de token cuando lo modifican', async () => {
      const res2 = await request(app)
        .get(`${baseUrl}/coins`)
        .set('Authorization', `Bearer abc${id_token}def`);

      expect(res2.statusCode).toBe(401);
      expect(res2.body).toEqual({
        status: expect.any(Number),
        message: expect.any(String),
      });
    });
  });

  describe('Pruebas al endpoint de asignación de criptomoneda a usuario', () => {
    test('Debe retornar error de autenticación al tratar de asignar monedas', async () => {
      const coinId = 'bitcoin';
      const userId = 1;
      const res = await request(app).post(
        `${baseUrl}/coins/${coinId}/user/${userId}`,
      );

      expect(res.statusCode).toBe(401);
      expect(res.body).toEqual({
        status: expect.any(Number),
        message: expect.any(String),
      });
    });

    test(`Debe retornar error de autorización al tratar de asignar monedas a otro usuario 
        diferente del autenticado`, async () => {
      const coinId = 'bitcoin';
      const userId = 2;
      const res = await request(app)
        .post(`${baseUrl}/coins/${coinId}/user/${userId}`)
        .set('Authorization', `Bearer ${id_token}`);

      expect(res.statusCode).toBe(403);
      expect(res.body).toEqual({
        status: expect.any(Number),
        message: expect.any(String),
      });
    });

    test(`Debe retornar error de no existencia de criptomoneda`, async () => {
      const coinId = 'bitc';
      const userId = 1;
      const res = await request(app)
        .post(`${baseUrl}/coins/${coinId}/user/${userId}`)
        .set('Authorization', `Bearer ${id_token}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        status: expect.any(Number),
        message: expect.any(String),
      });
    });

    // Esta debe fallar la segunda vez que se ejecute, ya que lo asignó
    test(`Debe retornar la asignación de moneda al usuario`, async () => {
      const coinId = 'bitcoin';
      const userId = 1;
      const res = await request(app)
        .post(`${baseUrl}/coins/${coinId}/user/${userId}`)
        .set('Authorization', `Bearer ${id_token}`);

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expect.any(Object));
    });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
