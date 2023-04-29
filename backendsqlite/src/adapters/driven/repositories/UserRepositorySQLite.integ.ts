import User from '../../../domain/entities/User';
import { cleanDb, seedDb } from '../../../util/dbUtils';
import UserRepositorySQLite from './UserRepositorySQLite';

const userRepository = new UserRepositorySQLite();

let anUser: User;

const buildUser = (userObj: any) => {
  return new User(userObj.id, userObj.name, userObj.email, userObj.passhash);
};

describe('UserRepositorySQLite integration tests', () => {
  beforeEach(async () => {
    await cleanDb();
    const data = await seedDb();
    anUser = buildUser(data.anUser);
  });

  describe('getByEmail', () => {
    test('should return null when no user found', async () => {
      const user = await userRepository.getByEmail('unknown@email.com');
      expect(user).toBe(null);
    });
    test('should return the user when found', async () => {
      const user = await userRepository.getByEmail(anUser.email);
      expect(user).toEqual(anUser);
    });
  });

  describe('create', () => {
    test('should return the created user', async () => {
      const userToCreate = new User(
        undefined,
        'new user',
        'new@user.mail',
        '$2b$04$RxEd75FD9YpSR9f/1RILIOD/iA4TMqTNlCOgjtmCELbx0h5U7YAXS'
      );
      const expectedUser = new User(
        expect.any(Number),
        'new user',
        'new@user.mail',
        undefined
      );
      const user = await userRepository.create(userToCreate);
      expect(user).toEqual(expectedUser);
    });
    test('should throw an error when the user with same email already exists', async () => {
      const userToCreate = new User(
        undefined,
        'new user',
        anUser.email,
        '$2b$04$RxEd75FD9YpSR9f/1RILIOD/iA4TMqTNlCOgjtmCELbx0h5U7YAXS'
      );
      await expect(userRepository.create(userToCreate)).rejects.toThrow(
        'Validation error'
      );
    });
  });
});
