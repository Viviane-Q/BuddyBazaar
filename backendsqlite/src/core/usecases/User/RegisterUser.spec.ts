import EncryptionInMemory from '../../../adapters/driven/EncryptionInMemory';
import UserRepositoryInMemory from '../../../adapters/driven/repositories/UserRepositoryInMemory';
import User from '../../../domain/entities/User';
import UserFixtures from '../../../domain/entities/User.fixtures';
import RegisterUser from './RegisterUser';

const userRepository = new UserRepositoryInMemory();
const encryption = new EncryptionInMemory();

const givenUsers = (users: User[]) => {
  userRepository.persist(users);
};

const whenNewUserRegisters = async (user: User, password: string) => {
  await RegisterUser({ user, password, userRepository, encryption });
};

const thenUsersShouldBe = async (users: User[]) => {
  const expectedUsers = await userRepository.getAll();
  expect(users).toEqual(expectedUsers);
};

describe('Feature: Register an user', () => {
  test('Example: Jean wants to register as the first user', async () => {
    givenUsers([]);
    await whenNewUserRegisters(UserFixtures.userJean, '123456');
    await thenUsersShouldBe([UserFixtures.userJeanWithHash]);
  });
});
