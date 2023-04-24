import UserRepositorySQLite from '../driven/repositories/UserRepositorySQLite';
import EncryptionLib from '../driven/EncryptionBcrypt';
import UserRepository from '../../domain/interfaces/repositories/UserRepository';
import Encryption from '../../domain/interfaces/Encryption';
import ActivityRepository from '../../domain/interfaces/repositories/ActivityRepository';
import ActivityRepositorySQLite from '../driven/repositories/AcitivityRepositorySQLite';

const userRepository = new UserRepositorySQLite();
const encryption = new EncryptionLib();
const activityRepository = new ActivityRepositorySQLite();

export interface Services {
  userRepository: UserRepository;
  encryption: Encryption;
  activityRepository: ActivityRepository
}

export default () => {
  return {
    userRepository,
    encryption,
    activityRepository
  };
};
