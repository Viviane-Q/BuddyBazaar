import UserRepositorySQLite from "../driven/repositories/UserRepositorySQLite";
import EncryptionLib from "../driven/EncryptionBcrypt";
import UserRepository from "../../domain/interfaces/repositories/UserRepository";
import Encryption from "../../domain/interfaces/Encryption";

const userRepository = new UserRepositorySQLite();
const encryption = new EncryptionLib();

export interface Services {
    userRepository: UserRepository;
    encryption: Encryption;
}

export default () => {
    return {
        userRepository,
        encryption,
    };
};