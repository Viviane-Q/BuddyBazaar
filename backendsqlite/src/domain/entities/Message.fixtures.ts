import Message from './Message';
import UserFixtures from './User.fixtures';
import ActivityFixtures from './Activity.fixtures';

export default class MessageFixtures {
  static messageFromJeanToClimbing = new Message(
    "Hello, I'm Jean",
    UserFixtures.userJean.id as number,
    ActivityFixtures.activityClimbing.id as number,
    new Date('2021-01-01T00:00:00.001Z'),
    1
  );

  static messageFromJeanToCinema = new Message(
    "Hello, I'm Jean",
    UserFixtures.userJean.id as number,
    ActivityFixtures.activityCinema.id as number,
    new Date('2021-01-01T00:00:00.002Z'),
    2
  );

  static messageFromMartinToCinema = new Message(
    "Hello, I'm Martin",
    UserFixtures.userMartin.id as number,
    ActivityFixtures.activityCinema.id as number,
    new Date('2021-01-01T00:00:00.003Z'),
    3
  );
}
