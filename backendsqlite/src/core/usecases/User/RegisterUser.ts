import User from "../../../domain/entities/User";
import Encryption from "../../interfaces/Encryption";
import UserRepository from "../../interfaces/repositories/UserRepository";

export default async ({ user, password, userRepository, encryption }: {
    user: User,
    password: string,
    userRepository: UserRepository,
    encryption: Encryption;
}) => {
    const hash = await encryption.hash(password);
    await userRepository.create(new User(user.id, user.name, user.email, hash));
};