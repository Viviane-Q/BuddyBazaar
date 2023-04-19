import UserRepositorySQLite from "../driven/repositories/UserRepositorySQLite";
import EncryptionBcrypt from "../driven/EncryptionBcrypt";
import UserRepository from "../../core/interfaces/repositories/UserRepository";
import Encryption from "../../core/interfaces/Encryption";

const userRepository = new UserRepositorySQLite();
const encryption = new EncryptionBcrypt();

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