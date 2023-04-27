import UserRepository from '../../../domain/interfaces/repositories/UserRepository';
import User from '../../../domain/entities/User';

class UserRepositoryInMemory implements UserRepository {
  private readonly users: User[] = [];

  getByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    return Promise.resolve(user ?? null);
  }

  persist(users: User[]): void {
    this.users.push(...users);
  }

  create(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }

  getAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }
}

export default UserRepositoryInMemory;
