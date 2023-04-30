import Activity, { Category } from '../../../domain/entities/Activity';
import User from '../../../domain/entities/User';
import { cleanDb, seedDb } from '../../../util/dbUtils';
import ActivityRepositorySQLite from './AcitivityRepositorySQLite';

const activityRepository = new ActivityRepositorySQLite();

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
    objActivity.userId
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
});
