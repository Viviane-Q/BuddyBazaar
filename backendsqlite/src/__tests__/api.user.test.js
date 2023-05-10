const app = require('../adapters/driving/app');
const request = require('supertest');
const { cleanDb, seedDb } = require('../util/dbUtils');
const { authTest, login } = require('./utils');

let anUser;

describe('e2e: /api/users', () => {
  beforeAll(async () => {
    await cleanDb();
    const data = await seedDb();
    anUser = data.anUser;
  });
  describe('POST /api/users/register', () => {
    test('Example: sends a request with name, email and password', async () => {
      const response = await request(app).post('/api/users/register').send({
        name: 'test',
        email: 'test@email.com',
        password: 'MyPassw0rd!',
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('User registered');
    });
    test('Example: sends a request with name, email and weak password', async () => {
      const response = await request(app).post('/api/users/register').send({
        name: 'test',
        email: 'test@email.com',
        password: 'weak',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe('Weak password!');
    });
    test('Example: sends a request with name, email and no password', async () => {
      const response = await request(app).post('/api/users/register').send({
        name: 'test',
        email: 'test@email.com',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'You must specify the name, email and password'
      );
    });
    test('Example: sends a request with name, used email and password', async () => {
      const response = await request(app).post('/api/users/register').send({
        name: 'test',
        email: anUser.email,
        password: 'MyPassw0rd!',
      });
      expect(response.statusCode).toBe(409);
      expect(response.body.message).toBe(
        'Email already registered'
      );
    });
  });

  describe('POST /api/users/signin', () => {
    test('Example: sends a request with correct email and password', async () => {
      const response = await request(app).post('/api/users/signin').send({
        email: anUser.email,
        password: anUser.password,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('User signed in');
      expect(response.body.token).toBeDefined();
    });
    test('Example: sends a request with correct email and wrong password', async () => {
      const response = await request(app).post('/api/users/signin').send({
        email: anUser.email,
        password: 'dummy password',
      });
      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe('Wrong email or password');
    });
    test('Example: sends a request with wrong email and password', async () => {
      const response = await request(app).post('/api/users/signin').send({
        email: 'dummy email',
        password: 'dummy password',
      });
      expect(response.statusCode).toBe(403);
      expect(response.body.message).toBe('Wrong email or password');
    });
    test('Example: sends a request with email and no password', async () => {
      const response = await request(app).post('/api/users/signin').send({
        email: 'test@email.com',
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'You must specify the email and password'
      );
    });
  });

  describe('GET /api/users/me', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'get', '/api/users/me')();
    });
    test('Example: sends a request with a valid token', async () => {
      const token = await login(request(app), anUser);
      const response = await request(app).get('/api/users/me').set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body.user).toEqual({
        id: anUser.id,
        name: anUser.name,
        email: anUser.email,
      });
    });
  });
});
