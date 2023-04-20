import User from '../../../domain/entities/User';

interface UserRepository {
  create(user: User): Promise<User>;
  getAll(): Promise<User[]>;
  getByEmail(email: string): Promise<User | null>;
}

export default UserRepository;
