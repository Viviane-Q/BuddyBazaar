import Activity, { Category } from '../../../domain/entities/Activity';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';
import DeleteActivity from './DeleteActivity';

const activityRepository = new ActivityRepositoryInMemory();

const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

const whenUserDeletesActivity = (activity: Activity) => {
  return DeleteActivity({
    activityId: activity.id as number,
    activityRepository,
  });
};

const thenActivitiesShouldBe = async (activities: Activity[]) => {
  const expectedActivies = await activityRepository.getAll();
  expect(activities).toEqual(expectedActivies);
};

describe('Feature: an user deletes an activity', () => {
  beforeEach(() => {
    activityRepository.clear();
  });
  test('Example: User wants to delete an existing activity', async () => {
    givenActivities([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
    ]);
    const activityDeleted = await whenUserDeletesActivity(
      ActivityFixtures.activityClimbing
    );
    expect(activityDeleted).toBe(true);
    await thenActivitiesShouldBe([ActivityFixtures.activityHiking]);
  });
  test('Example: User wants to delete a non existing activity', async () => {
    givenActivities([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
    ]);
    const activityDeleted = await whenUserDeletesActivity(
      new Activity(
        999,
        '',
        '',
        new Date(),
        new Date(),
        0,
        0,
        '',
        0,
        0,
        Category.Other,
        0
      )
    );
    expect(activityDeleted).toBe(false);
    await thenActivitiesShouldBe([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
    ]);
  });
});
