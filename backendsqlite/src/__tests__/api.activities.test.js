const app = require('../adapters/driving/app');
const request = require('supertest');
const { cleanDb, seedDb } = require('../util/dbUtils');
const { login, authTest } = require('./utils');

let anUser;
let anActivity;
let anActivity2;
let anActivity3;
let anActivityRegistration;
let token;

const convertToBody = (activity) => {
  return {
    id: activity.id,
    title: activity.title,
    description: activity.description,
    startDate: activity.startDate.toISOString(),
    endDate: activity.endDate.toISOString(),
    numberPersonMax: activity.numberPersonMax,
    cost: activity.cost,
    place: activity.place,
    longitude: activity.longitude,
    latitude: activity.latitude,
    category: activity.category,
    userId: activity.userId,
    participants: activity.dataValues.activitiesRegistrations?.map(
      (registration) => registration.userId
    ) || [],
  };
};

describe('e2e: /api/activities', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anUser = data.anUser;
    anActivity = convertToBody(data.anActivity);
    anActivity2 = convertToBody(data.anActivity2);
    anActivity3 = convertToBody(data.anActivity3);
    anActivityRegistration = data.anActivityRegistration;
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
          longitude: 45.188529,
          latitude: 5.724524,
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
          longitude: 45.188529,
          latitude: 5.724524,
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
          longitude: 45.188529,
          latitude: 5.724524,
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
        activities: [anActivity, anActivity2],
      });
    });
  });

  describe('GET /api/activities/:activityId', () => {
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
        activity: anActivity,
      });
    });
  });

  describe('PUT /api/activities/:activityId', () => {
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

  describe('DELETE /api/activities/:activityId', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'delete', '/api/activities/1')();
      test('Example: sends a request with an id not belonging to the user', async () => {
        const response = await request(app)
          .delete(`/api/activities/${anActivity2.id}}`)
          .set({ token });
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe(
          'You are not authorized to do this action'
        );
      });
    });
    test('Example: deletes an activity belonging to the user', async () => {
      const response = await request(app)
        .delete(`/api/activities/${anActivity.id}`)
        .set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Activity deleted',
      });
    });
  });

  describe('GET /api/activities/', () => {
    test('Example: get all activities on the platform', async () => {
      const response = await request(app).get('/api/activities');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Activities retrieved',
        activities: [anActivity, anActivity2, anActivity3],
      });
    });
    test('Example: get all activities with title or description containing "activité"', async () => {
      const response = await request(app).get(
        '/api/activities?querySearch=activité'
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Activities retrieved',
        activities: [anActivity, anActivity2],
      });
    });
    test('Example: get all activities with title or description containing "ciné" and between 2024-01-01 18:00:00 and 2024-01-02 22:00:00', async () => {
      const response = await request(app).get(
        `/api/activities?querySearch=ciné&startDate=${new Date(
          '2024-01-01 18:00:00'
        ).toISOString()}&endDate=${new Date(
          '2024-01-02 22:00:00'
        ).toISOString()}`
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Activities retrieved',
        activities: [anActivity3],
      });
    });
  });

  describe('POST /api/activities/:activityId/register', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'post', '/api/activities/1/register')();
    });
    test('Example: send a new registration for an activity', async () => {
      const response = await request(app)
        .post(`/api/activities/${anActivity3.id}/register`)
        .set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Registration successful',
      });
    });
  });

  describe('POST /api/activities/:activityId/unregister', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'post', '/api/activities/1/unregister')();
    });
    test('Example: send a de-registration for an existing registration', async () => {
      const response = await request(app)
        .post(`/api/activities/${anActivityRegistration.activityId}/unregister`)
        .set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'De-registration successful',
      });
    });
  });
});
