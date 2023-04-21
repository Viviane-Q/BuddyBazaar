import EncryptionInMemory from '../../../adapters/driven/EncryptionInMemory';
import UserRepositoryInMemory from '../../../adapters/driven/repositories/UserRepositoryInMemory';
import User from '../../../domain/entities/User';
import UserFixtures from '../../../domain/entities/User.fixtures';
import SignInUser from './SignInUser';

const userRepository = new UserRepositoryInMemory();
const encryption = new EncryptionInMemory();

const givenUsers = (users: User[]) => {
  userRepository.persist(users);
};

const whenUserSignsIn = (
  email: string,
  password: string
): Promise<string | null> => {
  return SignInUser({ email, password, userRepository, encryption });
};

const thenTokenShouldBe = (
  expectedToken: string | null,
  receivedToken: string | null
) => {
  expect(expectedToken).toEqual(receivedToken);
};

describe('Feature: Sign in an user', () => {
  test('Example: Jean wants to sign in as the first user registered', async () => {
    givenUsers([UserFixtures.userJeanWithHash]);
    const receivedToken = await whenUserSignsIn(
      UserFixtures.userJeanWithHash.email,
      '123456'
    );
    thenTokenShouldBe('token', receivedToken);
  });
  test('Example: Martin wants to sign in but is not registered', async () => {
    givenUsers([UserFixtures.userJeanWithHash]);
    const receivedToken = await whenUserSignsIn(
      UserFixtures.userMartin.email,
      '123456'
    );
    thenTokenShouldBe(null, receivedToken);
  });
});
