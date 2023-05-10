import UserRepository from '../../../domain/interfaces/repositories/UserRepository';
import User from '../../../domain/entities/User';
import models from '../models';
import Sequelize from 'sequelize';
class UserRepositorySQLite implements UserRepository {
  async getByEmail(email: string): Promise<User | null> {
    const seqUser = await models.users.findOne({
      where: {
        email: {
          [Sequelize.Op.like]: email,
        },
      },
    });
    if (!seqUser) return null;
    return new User(seqUser.id, seqUser.name, seqUser.email, seqUser.passhash);
  }

  async create(user: User): Promise<User> {
    const seqUser = await models.users.create(user.toObjectWithPasshash());
    return new User(seqUser.id, seqUser.name, seqUser.email);
  }

  getAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}

export default UserRepositorySQLite;
