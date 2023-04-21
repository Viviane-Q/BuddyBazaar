import User from './User';

export default class UserFixtures {
  static userJean = new User(1, 'Jean', 'jean@mail.com');
  static userJeanWithHash = new User(1, 'Jean', 'jean@mail.com', 'hash');
  static userMartin = new User(2, 'Martin', 'martin@mail.com');
}
