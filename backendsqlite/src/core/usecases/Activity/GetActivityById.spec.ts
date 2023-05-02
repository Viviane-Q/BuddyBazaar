import Activity from '../../../domain/entities/Activity';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';
import GetActivityById from './GetActivityById';

const activityRepository = new ActivityRepositoryInMemory();

const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

const whenUserRetrievesActivity = (activityId: number) => {
  return GetActivityById({
    activityId,
    activityRepository,
  });
};

describe('Feature: an user retrieves one activity', () => {
  beforeEach(() => {
    activityRepository.clear();
  });
  test('Example: User wants to retrieve an existing activity', async () => {
    givenActivities([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
    ]);
    const retrievedActivity = await whenUserRetrievesActivity(
      ActivityFixtures.activityClimbing.id as number
    );
    expect(retrievedActivity).toBe(ActivityFixtures.activityClimbing);
  });
  test('Example: User wants to retrieve a non existing activity', async () => {
    givenActivities([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
    ]);
    const retrievedActivity = await whenUserRetrievesActivity(999);
    expect(retrievedActivity).toBe(null);
  });
});
