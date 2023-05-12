import Message from './Message';

export default class MessageFixtures {
  static messageFromJeanToClimbing = new Message(
    "Hello, I'm Jean",
    1,
    1,
    new Date('2021-01-01T00:00:00.000Z'),
    1
  );

  static messageFromMartinToHiking = new Message(
    "Hello, I'm Martin",
    2,
    2,
    new Date('2021-01-01T00:00:00.000Z'),
    2
  );

  static messageFromJeanToHiking = new Message(
    "Hello, I'm Jean",
    1,
    2,
    new Date('2021-01-01T00:00:00.000Z'),
    3
  );
}
