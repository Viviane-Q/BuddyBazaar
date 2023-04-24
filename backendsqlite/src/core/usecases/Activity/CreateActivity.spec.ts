import Activity from '../../../domain/entities/Activity';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import CreateActivity from '../Activity/CreateActivity';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';

const activityRepository = new ActivityRepositoryInMemory();
const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

describe('Feature: an user creeate an activity', () => {
  test('Example: User wants to create his first activity', async () => {
    givenActivities([]); // no activity before
    const res = await CreateActivity({ activity: ActivityFixtures.activityClimbing, activityRepository });
    expect(res).toBe(true);
  });
  // test('Example: Martin wants to sign in but is not registered', async () => {
  // 	givenUsers([UserFixtures.userJeanWithHash]);
  // 	const receivedToken = await whenUserSignsIn(
  // 		UserFixtures.userMartin.email,
  // 		'123456'
  // 	);
  // 	thenTokenShouldBe(null, receivedToken);
  // });
});
