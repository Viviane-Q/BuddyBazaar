import Activity from '../../../domain/entities/Activity';
import ActivityRepositoryInMemory from '../../../adapters/driven/repositories/ActivityRepositoryInMemory';
import ActivityFixtures from '../../../domain/entities/Activity.fixtures';
import GetActivities from './GetActivities';

const activityRepository = new ActivityRepositoryInMemory();

const givenActivities = (activities: Activity[]) => {
  activityRepository.persist(activities);
};

const whenUserRetrievesActivities = ({
  querySearch,
  startDate,
  endDate,
  numberPersonMax,
  cost,
  place,
  category,
}: {
  querySearch?: string;
  startDate?: Date;
  endDate?: Date;
  numberPersonMax?: number;
  cost?: number;
  place?: string;
  category?: string;
}) => {
  return GetActivities({
    activityRepository,
    querySearch,
    startDate,
    endDate,
    numberPersonMax,
    cost,
    place,
    category,
  });
};

describe('Feature: an user retrieves activities of the app', () => {
  beforeAll(() => {
    givenActivities([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
      ActivityFixtures.activityCinema,
    ]);
  });
  test('Example: User wants to retrieve every activities of the app', async () => {
    const activities = await whenUserRetrievesActivities({});
    expect(activities).toEqual([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
      ActivityFixtures.activityCinema,
    ]);
  });
  test('Example: User wants to retrieve every activies in the Sport category', async () => {
    const activities = await whenUserRetrievesActivities({
      category: 'Sport',
    });
    expect(activities).toEqual([
      ActivityFixtures.activityClimbing,
      ActivityFixtures.activityHiking,
    ]);
  });
  test('Example: User wants to retrieve every activies that contains "Escalade" in the title or the description', async () => {
    const activities = await whenUserRetrievesActivities({
      querySearch: 'Escalade',
    });
    expect(activities).toEqual([ActivityFixtures.activityClimbing]);
  });
  test('Example: User wants to retrieve every activies that cost under 5 euros', async () => {
    const activities = await whenUserRetrievesActivities({ cost: 5 });
    expect(activities).toEqual([ActivityFixtures.activityHiking]);
  });
  test('Example: User wants to retrieve every activies happening between 02-05-2023 10:00:00 and 02-05-2023 16:00:00', async () => {
    const activities = await whenUserRetrievesActivities({
      startDate: new Date('2024-05-02 13:00:00'),
      endDate: new Date('2024-05-02 16:00:00'),
    });
    expect(activities).toEqual([ActivityFixtures.activityCinema]);
  });
});
