import UserRepository from '../../../domain/interfaces/repositories/UserRepository';
import User from '../../../domain/entities/User';
import models from '../models';
import Sequelize from 'sequelize';
class UserRepositorySQLite implements UserRepository {
  getByEmail(email: string): Promise<User | null> {
    return models.users.findOne({
      where: {
        email: {
          [Sequelize.Op.like]: email,
        },
      },
    });
  }

  create(user: User): Promise<User> {
    return models.users.create(user.serialize());
  }

  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}

export default UserRepositorySQLite;
