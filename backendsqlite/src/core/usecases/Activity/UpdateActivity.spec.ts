import Activity from '../../../domain/entities/Activity';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import UpdateActivity from '../Activity/UpdateActivity';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';

const activityRepository = new ActivityRepositoryInMemory();

const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

const whenUserUpdateActivity = (activityToChange: Activity) => {
  const activity = new Activity(
    activityToChange.id,
    'Escalade updated',
    activityToChange.description,
    activityToChange.startDate,
    activityToChange.endDate,
    activityToChange.numberPersonMax,
    activityToChange.cost,
    activityToChange.place,
    activityToChange.longitude,
    activityToChange.latitude,
    activityToChange.category,
    activityToChange.userId
  );
  return UpdateActivity({ activity, activityRepository });
};

const thenActivitiesShouldBe = async (activities: Activity[]) => {
  const expectedActivies = await activityRepository.getAll();
  expect(activities).toEqual(expectedActivies);
};

describe('Feature: an user update an activity', () => {
  test('Example: User wants to update  his first activity', async () => {
    givenActivities([ActivityFixtures.activityClimbing]);
    const activityUpdated = await whenUserUpdateActivity(
      ActivityFixtures.activityClimbing
    );
    expect(activityUpdated).toBe(true);
    await thenActivitiesShouldBe([ActivityFixtures.activityClimbingUpdated]);
  });
});
