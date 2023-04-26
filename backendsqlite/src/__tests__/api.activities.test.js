const app = require('../adapters/driving/app');
const request = require('supertest');
const { cleanDb, seedDb } = require('../util/dbUtils');
const { login, authTest } = require('./utils');

let anUser;
let anActivity;
let token;

describe('e2e: /api/activities', () => {
  beforeAll(async () => {
    await cleanDb();
    const data = await seedDb();
    anUser = data.anUser;
    anActivity = data.anActivity;
    token = await login(request(app), anUser);
  });
  describe('POST /api/activities', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'post', '/api/activities')();
    });
    test('Example: sends a request with title, description, start date, end date, number of person max, cost, place and category', async () => {
      const response = await request(app)
        .post('/api/activities')
        .send({
          title: 'An activity',
          description: 'An activity description',
          startDate: '2024-01-01 10:00:00',
          endDate: '2024-01-01 12:00:00',
          numberPersonMax: 5,
          cost: 10,
          place: 'Grenoble',
          category: 'Sport',
        })
        .set({ token });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Activity created');
    });
    test('Example: sends a request with missing category', async () => {
      const response = await request(app)
        .post('/api/activities')
        .send({
          title: 'An activity',
          description: 'An activity description',
          startDate: '2024-01-01 10:00:00',
          endDate: '2024-01-01 12:00:00',
          numberPersonMax: 5,
          cost: 10,
          place: 'Grenoble',
        })
        .set({ token });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'You must specify the title, description, startDate, endDate, number of person max, cost, place and category'
      );
    });
    test('Example: sends a request with start date greater than end date', async () => {
      const response = await request(app)
        .post('/api/activities')
        .send({
          title: 'An activity',
          description: 'An activity description',
          startDate: '2024-01-01 10:00:00',
          endDate: '2024-01-01 8:00:00',
          numberPersonMax: 5,
          cost: 10,
          place: 'Grenoble',
          category: 'Sport',
        })
        .set({ token });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(
        'The end date must be after the start date'
      );
    });
  });

  describe('GET /api/activities/by-user', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'get', '/api/activities/by-user')();
    });
    test('Example: sends a successful request', async () => {
      const response = await request(app)
        .get('/api/activities/by-user')
        .set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Activities retrieved',
        activities: [JSON.parse(JSON.stringify(anActivity))],
      });
    });
  });
});
