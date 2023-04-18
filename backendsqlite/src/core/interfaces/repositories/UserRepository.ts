import User from "../../../domain/entities/User";

interface UserRepository {
    create(user: User): Promise<User>;
    getAll(): Promise<User[]>;
}

export default UserRepository;