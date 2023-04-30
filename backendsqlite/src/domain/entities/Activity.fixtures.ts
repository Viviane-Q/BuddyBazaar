import Activity, { Category } from './Activity';
import UserFixtures from './User.fixtures';
const dateBeginning = new Date('2024-04-25');
const dateEnd = new Date('2024-04-26');

export default class ActivityFixtures {
  static activityClimbing = new Activity(
    1,
    'Escalade',
    'Grimpe à ev3',
    dateBeginning,
    dateEnd,
    2,
    15,
    'ev3',
    Category.Sport,
    UserFixtures.userJean.id as number
  );

  static activityClimbingUpdated = new Activity(
    1,
    'Escalade updated',
    'Grimpe à ev3',
    dateBeginning,
    dateEnd,
    2,
    15,
    'ev3',
    Category.Sport,
      UserFixtures.userJean.id as number
  );

  static activityHiking = new Activity(
    2,
    'Randonnée',
    'Montée de la Bastille',
    dateBeginning,
    dateEnd,
    4,
    0,
    'Bastille',
    Category.Sport,
    UserFixtures.userMartin.id as number
  );
}