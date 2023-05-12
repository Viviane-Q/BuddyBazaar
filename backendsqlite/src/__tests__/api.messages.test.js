const app = require('../adapters/driving/app');
const request = require('supertest');
const { cleanDb, seedDb } = require('../util/dbUtils');
const { authTest, login } = require('./utils');

let anUser;
let anActivity2;
let aMessage;
let aMessage2;
let token;

const convertToBody = (message) => {
  return {
    id: message.id,
    content: message.content,
    userId: message.userId,
    activityId: message.activityId,
    createdAt: message.createdAt.toISOString(),
    user: {
      id: message.dataValues.user.id,
      name: message.dataValues.user.name,
      email: message.dataValues.user.email,
    },
  };
};

describe('e2e: /api/activities/:activityId/messages', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anUser = data.anUser;
    anActivity2 = data.anActivity2;
    aMessage = convertToBody(data.aMessage);
    aMessage2 = convertToBody(data.aMessage2);
    token = await login(request(app), anUser);
  });

  describe('GET /api/activities/:activityId/messages', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'get', '/api/activities/1/messages')();
    });
    test('Example: get messages for an activity', async () => {
      const response = await request(app)
        .get(`/api/activities/${anActivity2.id}/messages`)
        .set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Messages retrieved',
        messages: [aMessage, aMessage2],
      });
    });
  });
});

describe('e2e: /api/messages', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anUser = data.anUser;
    anActivity2 = data.anActivity2;
    aMessage = convertToBody(data.aMessage);
    aMessage2 = convertToBody(data.aMessage2);
    token = await login(request(app), anUser);
  });

  describe('GET /api/messages/last', () => {
    describe('Rbac rules', () => {
      authTest(request(app), 'get', '/api/messages/last')();
    });
    test("Example: get last messages for each user's activity", async () => {
      const response = await request(app)
        .get('/api/messages/last')
        .set({ token });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Messages retrieved',
        messages: [aMessage2],
      });
    });
  });
});
