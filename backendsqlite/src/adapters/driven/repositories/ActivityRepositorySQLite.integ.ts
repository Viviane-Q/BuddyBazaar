import Activity, { Category } from '../../../domain/entities/Activity';
import User from '../../../domain/entities/User';
import { cleanDb, seedDb } from '../../../util/dbUtils';
import ActivityRepositorySQLite from './ActivityRepositorySQLite';

const activityRepository = new ActivityRepositorySQLite();

let anActivity: Activity;
let anActivity2: Activity;
let anActivity3: Activity;
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
  return new User(userObj.id, userObj.name, userObj.email, userObj.passhash);
};

describe('ActivityRepositorySQLite integration tests', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anActivity = buildActivity(data.anActivity);
    anActivity2 = buildActivity(data.anActivity2);
    anActivity3 = buildActivity(data.anActivity3);
    anUser = buildUser(data.anUser);
  });

  describe('getByUserIdAndActivityId', () => {
    test('should return the activity if the user is the owner', async () => {
      const activity = await activityRepository.getByUserIdAndActivityId(
        anActivity.id as number,
        anUser.id as number
      );
      expect(activity).toEqual(anActivity);
    });
    test('should return the activity if the user is a participant', async () => {
      const activity = await activityRepository.getByUserIdAndActivityId(
        anActivity2.id as number,
        anUser.id as number
      );
      expect(activity).toEqual(anActivity2);
    });
  });

  describe('create', () => {
    test('should return the created activity', async () => {
      const activityToCreate = new Activity(
        undefined,
        'title',
        'description',
        new Date(),
        new Date(),
        10,
        10,
        'place',
        40,
        5,
        Category.Sport,
        anUser.id as number
      );
      const expectedActivity = new Activity(
        expect.any(Number),
        activityToCreate.title,
        activityToCreate.description,
        activityToCreate.startDate,
        activityToCreate.endDate,
        activityToCreate.numberPersonMax,
        activityToCreate.cost,
        activityToCreate.place,
        activityToCreate.longitude,
        activityToCreate.latitude,
        activityToCreate.category,
        activityToCreate.userId
      );
      const activity = await activityRepository.create(activityToCreate);
      expect(activity).toEqual(expectedActivity);
    });
  });

  describe('getAllByUserId', () => {
    test('should return an array of activities belonging to the user', async () => {
      const result = await activityRepository.getAllByUserId(
        anUser.id as number
      );
      expect(result).toEqual([anActivity]);
    });
    test('should return an empty array because the user does not exist', async () => {
      const result = await activityRepository.getAllByUserId(999);
      expect(result).toEqual([]);
    });
  });

  describe('getAllRegisteredByUserId', () => {
    test('should return an array of activities which user is registered for', async () => {
      const result = await activityRepository.getAllRegisteredByUserId(
        anUser.id as number
      );
      expect(result).toEqual([anActivity2]);
    });
    test('should return an empty array because the user does not exist', async () => {
      const result = await activityRepository.getAllRegisteredByUserId(999);
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    test('should update an activity', async () => {
      const result = await activityRepository.update(anActivity);
      expect(result).toBe(true);
    });
    test('should not update anything because the activity does not exist', async () => {
      const result = await activityRepository.update(
        new Activity(
          999,
          'title',
          'description',
          new Date(),
          new Date(),
          10,
          10,
          'place',
          40,
          5,
          Category.Sport,
          1
        )
      );
      expect(result).toBe(false);
    });
  });

  describe('getById', () => {
    test('should return an activity', async () => {
      const result = await activityRepository.getById(anActivity.id as number);
      expect(result).toEqual(anActivity);
    });
    test('should return null because the activity does not exist', async () => {
      const result = await activityRepository.getById(999);
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    test('should delete an activity', async () => {
      const result = await activityRepository.delete(anActivity.id as number);
      expect(result).toBe(true);
    });
    test('should not delete anything because the activity does not exist', async () => {
      const result = await activityRepository.delete(999);
      expect(result).toBe(false);
    });
  });

  describe('geAll', () => {
    test('should get all activities', async () => {
      const activies = await activityRepository.getAll();
      expect(activies).toEqual([anActivity, anActivity2, anActivity3]);
    });
    test('should get all activities with title or description containing "activité"', async () => {
      const activies = await activityRepository.getAll('Activité');
      expect(activies).toEqual([anActivity, anActivity2]);
    });
    test('should get all activities with title or description containing "ciné" and between 2024-01-01 18:00:00 and 2024-01-02 22:00:00', async () => {
      const activies = await activityRepository.getAll('ciné', new Date('2024-01-01 18:00:00'), new Date('2024-01-02 22:00:00'));
      expect(activies).toEqual([anActivity3]);
    });
    test('should get all activities with numberPersonMax of 4 or under', async () => {
      const activies = await activityRepository.getAll(undefined, undefined, undefined, 4);
      expect(activies).toEqual([anActivity2, anActivity3]);
    });
    test('should get all activities with cost of 5 or under', async () => {
      const activies = await activityRepository.getAll(undefined, undefined, undefined, undefined, 5);
      expect(activies).toEqual([anActivity2]);
    });
    test('should get all activities in Grenoble', async () => {
      const activies = await activityRepository.getAll('Grenoble');
      expect(activies).toEqual([anActivity, anActivity3]);
    });
    test('should get all activities in Sport category', async () => {
      const activies = await activityRepository.getAll(undefined, undefined, undefined, undefined, undefined, 'Sport');
      expect(activies).toEqual([anActivity]);
    });
  });
});
