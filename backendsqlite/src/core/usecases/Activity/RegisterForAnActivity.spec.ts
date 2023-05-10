import Activity from '../../../domain/entities/Activity';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';
import ActivityRegistrationRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRegistrationRepositoryInMemory';
import RegisterForAnActivity from './RegisterForAnActivity';
import UserFixtures from '../../../domain/entities/User.fixtures';

const activityRepository = new ActivityRepositoryInMemory();
const activityRegistrationRepository =
  new ActivityRegistrationRepositoryInMemory();

const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

const givenActivitiesRegistrations = (activitiesRegistrations: any[]) => {
  activityRegistrationRepository.persist(activitiesRegistrations);
};

const whenUserRegistersForAnActivity = (activityId: number, userId: number) => {
  return RegisterForAnActivity({
    activityId,
    userId,
    activityRepository,
    activityRegistrationRepository,
  });
};

const thenRegistrationsShouldBe = async (activitiesRegistrations: any[]) => {
  const expectedActivitiesRegistrations =
    await activityRegistrationRepository.getAll();
  expect(activitiesRegistrations).toEqual(expectedActivitiesRegistrations);
};

describe('Feature: an user registers for an activity', () => {
  test('Example: User wants to register for an activity', async () => {
    givenActivities([ActivityFixtures.activityClimbing]);
    givenActivitiesRegistrations([]);
    const activityId = ActivityFixtures.activityClimbing.id as number;
    const userId = UserFixtures.userMartin.id as number;
    const result = await whenUserRegistersForAnActivity(activityId, userId);
    expect(result).toBe(true);
    await thenRegistrationsShouldBe([
      {
        activityId: ActivityFixtures.activityClimbing.id,
        userId: UserFixtures.userMartin.id,
      },
    ]);
  });
  test('Example: User wants to register for an non existing activity', async () => {
    givenActivities([ActivityFixtures.activityClimbing]);
    givenActivitiesRegistrations([]);
    const userId = UserFixtures.userMartin.id as number;
    expect(whenUserRegistersForAnActivity(999, userId)).rejects.toThrow(
      'Activity not found'
    );
  });
  test('Example: User wants to register for a past activity', async () => {
    givenActivities([ActivityFixtures.pastActivity]);
    givenActivitiesRegistrations([]);
    const activityId = ActivityFixtures.pastActivity.id as number;
    const userId = UserFixtures.userMartin.id as number;
    expect(whenUserRegistersForAnActivity(activityId, userId)).rejects.toThrow(
      'Activity already started'
    );
  });
  test('Example: User wants to register for his own activity', async () => {
    givenActivities([ActivityFixtures.activityClimbing]);
    givenActivitiesRegistrations([]);
    const activityId = ActivityFixtures.activityClimbing.id as number;
    const userId = ActivityFixtures.activityClimbing.userId as number;
    expect(whenUserRegistersForAnActivity(activityId, userId)).rejects.toThrow(
      'You cannot register for your own activity'
    );
  });
  test('Example: User wants to register for a full activity', async () => {
    givenActivities([ActivityFixtures.activityClimbing]);
    givenActivitiesRegistrations([
      {
        activityId: ActivityFixtures.activityClimbing.id,
        userId: 3,
      },
      {
        activityId: ActivityFixtures.activityClimbing.id,
        userId: 4,
      },
    ]);
    const activityId = ActivityFixtures.activityClimbing.id as number;
    const userId = UserFixtures.userMartin.id as number;
    expect(whenUserRegistersForAnActivity(activityId, userId)).rejects.toThrow(
      'Activity is full'
    );
  });
});
