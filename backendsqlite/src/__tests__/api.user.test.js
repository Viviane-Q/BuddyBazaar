const app = require('../adapters/driving/app');
const request = require('supertest');
const { cleanDb, seedDb } = require('../util/dbUtils');

let anUser;

describe('e2e: /api/users', () => {
  beforeAll(async () => {
    const data = await seedDb();
    anUser = data.anUser;
  });
  afterAll(async () => {
    await cleanDb();
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
  });

  describe('POST /api/users/signin', () => {
    test('Example: sends a request with correct email and password', async () => {
      const response = await request(app).post('/api/users/signin').send({
        email: anUser.email,
        password: anUser.password,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('User signed in');
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
});
