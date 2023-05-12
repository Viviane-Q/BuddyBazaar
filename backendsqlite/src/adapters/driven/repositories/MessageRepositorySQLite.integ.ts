import Activity from '../../../domain/entities/Activity';
import Message from '../../../domain/entities/Message';
import User from '../../../domain/entities/User';
import { cleanDb, seedDb } from '../../../util/dbUtils';
import MessageRepositorySQLite from './MessageRepositorySQLite';

const messageRepository = new MessageRepositorySQLite();

let anActivity: Activity;
let anActivity2: Activity;
let anUser: User;
let anUser2: User;
let aMessage: Message;
let aMessage2: Message;

const buildActivity = (objActivity: any) => {
  return new Activity(
    objActivity.id,
    objActivity.title,
    objActivity.description,
    objActivity.startDate,
    objActivity.endDate,
    objActivity.numberPersonMax,
    objActivity.cost,
    objActivity.place,
    objActivity.longitude,
    objActivity.latitude,
    objActivity.category,
    objActivity.userId,
    objActivity.dataValues.activitiesRegistrations?.map((registration: any) => {
      return registration.userId;
    })
  );
};

const buildUser = (userObj: any) => {
  return new User(userObj.id, userObj.name, userObj.email);
};

const buildMessage = (messageObj: any, user: User) => {
  return new Message(
    messageObj.content,
    messageObj.userId,
    messageObj.activityId,
    messageObj.createdAt,
    messageObj.id,
    user
  );
};

describe('ActivityRepositorySQLite integration tests', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anActivity = buildActivity(data.anActivity);
    anActivity2 = buildActivity(data.anActivity2);
    anUser = buildUser(data.anUser);
    anUser2 = buildUser(data.anUser2);
    aMessage = buildMessage(data.aMessage, anUser);
    aMessage2 = buildMessage(data.aMessage2, anUser2);
  });

  describe('create', () => {
    test('should return the created message', async () => {
      const messageToCreate = new Message(
        'a message',
        anUser.id as number,
        anActivity.id as number
      );
      const expectedMessage = new Message(
        messageToCreate.content,
        messageToCreate.userId,
        messageToCreate.activityId,
        expect.any(Date),
        expect.any(Number)
      );
      const message = await messageRepository.create(messageToCreate);
      expect(message).toEqual(expectedMessage);
    });
    test('should not create the message because the activity does not exist', async () => {
      const messageToCreate = new Message(
        'a message',
        anUser.id as number,
        999
      );
      const message = await messageRepository.create(messageToCreate);
      expect(message).toBeNull();
    });
    test('should not create the message because the user does not exist', async () => {
      const messageToCreate = new Message(
        'a message',
        999,
        anActivity.id as number
      );
      const message = await messageRepository.create(messageToCreate);
      expect(message).toBeNull();
    });
  });

  describe('getByActivityId', () => {
    test("should return the messages of an activity with the sender's infos", async () => {
      const expectedMessages = [aMessage, aMessage2];
      const messages = await messageRepository.getByActivityId(
        anActivity2.id as number
      );
      expect(messages).toEqual(expectedMessages);
    });
  });

  describe('getLastMessagesForActivities', () => {
    test("should return the last message for each activity with the sender's infos", async () => {
      const expectedMessages = [aMessage2];
      const messages = await messageRepository.getLastMessagesForActivities([
        anActivity.id as number,
        anActivity2.id as number,
      ]);
      expect(messages).toEqual(expectedMessages);
    });
  });
});
