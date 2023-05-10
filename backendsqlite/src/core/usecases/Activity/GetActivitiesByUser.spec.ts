import Activity from '../../../domain/entities/Activity';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';
import User from '../../../domain/entities/User';
import GetActivitiesByUserId from './GetActivitiesByUser';
import UserFixtures from '../../../domain/entities/User.fixtures';

const activityRepository = new ActivityRepositoryInMemory();

const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

const whenUserRetrievesActivities = (user: User) => {
  if (!user.id) {
    return;
  }
  return GetActivitiesByUserId({ userId: user.id, activityRepository });
};

describe('Feature: an user retrieves their activities', () => {
  test('Example: User retrieves their owned activities and their registered activities', async () => {
    givenActivities([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
      ActivityFixtures.activityCinema,
    ]); // activities of two different users
    const activities = await whenUserRetrievesActivities(UserFixtures.userJean);
    expect(activities).toEqual([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityCinema,
    ]);
  });
});
