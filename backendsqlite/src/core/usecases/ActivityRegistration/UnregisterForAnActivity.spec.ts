import ActivityFixtures from '../../../domain/entities/Activity.fixtures';
import ActivityRegistrationRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRegistrationRepositoryInMemory';
import UserFixtures from '../../../domain/entities/User.fixtures';
import UnregisterForAnActivity from './UnregisterForAnActivity';

const activityRegistrationRepository =
  new ActivityRegistrationRepositoryInMemory();

const givenActivitiesRegistrations = (activitiesRegistrations: any[]) => {
  activityRegistrationRepository.persist(activitiesRegistrations);
};

const whenUserUnregistersForAnActivity = (
  activityId: number,
  userId: number
) => {
  return UnregisterForAnActivity({
    activityId,
    userId,
    activityRegistrationRepository,
  });
};

const thenRegistrationsShouldBe = async (activitiesRegistrations: any[]) => {
  const expectedActivitiesRegistrations =
    await activityRegistrationRepository.getAll();
  expect(activitiesRegistrations).toEqual(expectedActivitiesRegistrations);
};

describe('Feature: an user registers for an activity', () => {
  test('Example: User wants to unregister for an activity', async () => {
    givenActivitiesRegistrations([
      {
        activityId: ActivityFixtures.activityClimbing.id,
        userId: UserFixtures.userMartin.id,
      },
    ]);
    const activityId = ActivityFixtures.activityClimbing.id as number;
    const userId = UserFixtures.userMartin.id as number;
    const result = await whenUserUnregistersForAnActivity(activityId, userId);
    expect(result).toBe(true);
    await thenRegistrationsShouldBe([]);
  });
});
