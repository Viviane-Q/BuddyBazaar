import User from '../../../domain/entities/User';
import Encryption from '../../../domain/interfaces/Encryption';
import UserRepository from '../../../domain/interfaces/repositories/UserRepository';

export default async ({
  user,
  password,
  userRepository,
  encryption,
}: {
  user: User;
  password: string;
  userRepository: UserRepository;
  encryption: Encryption;
}): Promise<boolean> => {
  const hash = await encryption.hash(password);
  const newUser = await userRepository.create(
    new User(user.id, user.name, user.email, hash)
  );
  return !!newUser;
};
