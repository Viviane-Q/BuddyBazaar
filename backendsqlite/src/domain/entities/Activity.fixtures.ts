import Activity, { Category } from './Activity';
import UserFixtures from './User.fixtures';
const dateBeginning = new Date('2023-04-25');
const dateEnd = new Date('2023-04-26');

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
}
