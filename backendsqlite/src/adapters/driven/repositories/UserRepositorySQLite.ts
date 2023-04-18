import UserRepository from "../../../core/interfaces/repositories/UserRepository";
import User from "../../../domain/entities/User";

class UserRepositorySQLite implements UserRepository {
    create (user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    getAll (): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}

export default UserRepositorySQLite;