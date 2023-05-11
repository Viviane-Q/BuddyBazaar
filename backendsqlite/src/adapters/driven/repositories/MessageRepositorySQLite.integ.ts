import Activity from '../../../domain/entities/Activity';
import Message from '../../../domain/entities/Message';
import User from '../../../domain/entities/User';
import { cleanDb, seedDb } from '../../../util/dbUtils';
import MessageRepositorySQLite from './MessageRepositorySQLite';

const messageRepository = new MessageRepositorySQLite();

let anActivity: Activity;
let anUser: User;

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
    objActivity.category,
    objActivity.userId,
    objActivity.dataValues.activitiesRegistrations?.map((registration: any) => {
      return registration.userId;
    })
  );
};

const buildUser = (userObj: any) => {
  return new User(userObj.id, userObj.name, userObj.email, userObj.passhash);
};

describe('ActivityRepositorySQLite integration tests', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anActivity = buildActivity(data.anActivity);
    anUser = buildUser(data.anUser);
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
});
