import Activity from '../../../domain/entities/Activity';
import User from '../../../domain/entities/User';
import { cleanDb, seedDb } from '../../../util/dbUtils';
import ActivityRegistrationRepositorySQLite from './ActivityRegistrationRepositorySQLite';

const activityRegistrationRepository =
  new ActivityRegistrationRepositorySQLite();

let anActivity3: Activity;
let anUser: User;
let anActivityRegistration: any;

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
    objActivity.userId
  );
};

const buildUser = (userObj: any) => {
  return new User(userObj.id, userObj.name, userObj.email, userObj.passhash);
};

describe('ActivityRegistrationRepositorySQLite integration tests', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anActivity3 = buildActivity(data.anActivity3);
    anUser = buildUser(data.anUser);
    anActivityRegistration = data.anActivityRegistration;
  });

  describe('registerForAnActivity', () => {
    test('should return true for a successful registration', async () => {
      const res = await activityRegistrationRepository.registerForAnActivity(
        anActivity3.id as number,
        anUser.id as number
      );
      expect(res).toBe(true);
    });
    test('should return false when registering an existing registration', async () => {
      const res = await activityRegistrationRepository.registerForAnActivity(
        anActivityRegistration.activityId as number,
        anActivityRegistration.userId as number
      );
      expect(res).toBe(false);
    });
  });

  describe('unregisterForAnActivity', () => {
    test('should return true for a successful de-registration', async () => {
      const res = await activityRegistrationRepository.unregisterForAnActivity(
        anActivityRegistration.activityId as number,
        anActivityRegistration.userId as number
      );
      expect(res).toBe(true);
    });
  });

  describe('countRegisteredForAnActivity', () => {
    test('should return the number of registrations for an activity', async () => {
      const res = await activityRegistrationRepository.countRegisteredForAnActivity(
        anActivityRegistration.activityId as number
      );
      expect(res).toBe(1);
    });
  });
});
