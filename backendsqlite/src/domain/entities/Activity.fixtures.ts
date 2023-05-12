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
    23.0,
    45.0,
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
    23.0,
    45.0,
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
    45.19,
    5.72,
    Category.Sport,
    UserFixtures.userMartin.id as number
  );

  static activityCinema = new Activity(
    3,
    'Ciné',
    'Petit film à Pathé Gaumont Chavant',
    new Date('2024-05-02 14:00:00'),
    new Date('2024-05-02 16:00:00'),
    2,
    10,
    'Grenoble',
    45.19,
    5.72,
    Category.Cinema,
    UserFixtures.userMartin.id as number,
    [UserFixtures.userJean.id as number]
  );

  static pastActivity = new Activity(
    4,
    'Ciné',
    'Petit film à Pathé Gaumont Chavant',
    new Date('2020-05-02 14:00:00'),
    new Date('2020-05-02 16:00:00'),
    2,
    10,
    'Grenoble',
    45.19,
    5.72,
    Category.Cinema,
    UserFixtures.userJean.id as number
  );
}
