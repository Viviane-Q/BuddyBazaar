import Encryption from '../../../domain/interfaces/Encryption';
import UserRepository from '../../../domain/interfaces/repositories/UserRepository';

export default async ({
  email,
  password,
  userRepository,
  encryption,
}: {
  email: string;
  password: string;
  userRepository: UserRepository;
  encryption: Encryption;
}): Promise<string | null> => {
  const { TOKENSECRET } = process.env;
  const user = await userRepository.getByEmail(email);
  if (user && user.passhash && TOKENSECRET) {
    if (await encryption.compare(password, user.passhash)) {
      const token = encryption.sign(email, TOKENSECRET);
      return token;
    }
  }
  return null;
};
