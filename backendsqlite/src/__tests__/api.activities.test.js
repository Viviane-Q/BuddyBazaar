const app = require('../adapters/driving/app');
const request = require('supertest');
const { cleanDb, seedDb } = require('../util/dbUtils');
const { login, authTest } = require('./utils');

let anUser;
let anActivity;
let anActivity2;
let token;

describe('e2e: /api/activities', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anUser = data.anUser;
    anActivity = data.anActivity;
    anActivity2 = data.anActivity2;
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

  describe('GET /api/activities/:id', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'get', '/api/activities/1')();
      test('Example: sends a request with an id not belonging to the user', async () => {
        const response = await request(app)
          .get(`/api/activities/${anActivity2.id}}`)
          .set({ token });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe(
          'You are not authorized to do this action'
        );
      });
    });
    test('Example: retrieves an ancivity belonging to the suser', async () => {
      const response = await request(app)
        .get(`/api/activities/${anActivity.id}}`)
        .set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Activity retrieved',
        activity: JSON.parse(JSON.stringify(anActivity)),
      });
    });
  });

  describe('PUT /api/activities/:id', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'put', '/api/activities/1')();
      test('Example: sends a request with an id not belonging to the user', async () => {
        const response = await request(app)
          .put(`/api/activities/${anActivity2.id}}`)
          .set({ token });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe(
          'You are not authorized to do this action'
        );
      });
    });
    test('Example: updates an activity belonging to the user', async () => {
      const activityUpdates = {
        ...JSON.parse(JSON.stringify(anActivity)),
        title: 'An activity update',
      };
      const response = await request(app)
        .put(`/api/activities/${anActivity.id}`)
        .send(activityUpdates)
        .set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Activity updated',
      });
    });
  });
});
