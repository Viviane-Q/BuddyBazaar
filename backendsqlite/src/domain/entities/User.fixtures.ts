import User from './User';

export default class UserFixtures {
  static userJean = new User(1, 'Jean', 'jean@mail.com');
  static userJeanWithHash = new User(1, 'Jean', 'jean@mail.com', '$2b$04$RxEd75FD9YpSR9f/1RILIOD/iA4TMqTNlCOgjtmCELbx0h5U7YAXS');
  static userMartin = new User(2, 'Martin', 'martin@mail.com');
}
