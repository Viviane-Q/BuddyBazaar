import Activity from '../../../domain/entities/Activity';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import CreateActivity from '../Activity/CreateActivity';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';

const activityRepository = new ActivityRepositoryInMemory();

const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

const whenUserCreatesActivity = (activity: Activity) => {
  return CreateActivity({ activity, activityRepository });
};

const thenActivitiesShouldBe = async (activities: Activity[]) => {
  const expectedActivies = await activityRepository.getAll();
  expect(activities).toEqual(expectedActivies);
};

describe('Feature: an user create an activity', () => {
  test('Example: User wants to create his first activity', async () => {
    givenActivities([]); // no activity before
    const activityCreated = await whenUserCreatesActivity(ActivityFixtures.activityClimbing);
    expect(activityCreated).toBe(true);
    await thenActivitiesShouldBe([ActivityFixtures.activityClimbing]);
  });
});
