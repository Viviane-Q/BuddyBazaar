import Activity, { Category } from './Activity';
const dateBeginning = new Date('2023-04-25');
const dateEnd = new Date('2023-04-26');

export default class UserFixtures {
  static activityClimbing = new Activity(1, 'Escalade', 'Grimpe à ev3', dateBeginning, 2, 15, 'ev3', Category.Sport, dateEnd);
}
