import UserRepository from "../../../core/interfaces/repositories/UserRepository";
import User from "../../../domain/entities/User";
import models from "../models";
class UserRepositorySQLite implements UserRepository {
    create (user: User): Promise<User> {
        return models.users.create(user);
    }

    getAll (): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}

export default UserRepositorySQLite;