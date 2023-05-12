import UserRepositorySQLite from '../driven/repositories/UserRepositorySQLite';
import EncryptionLib from '../driven/EncryptionLib';
import UserRepository from '../../domain/interfaces/repositories/UserRepository';
import Encryption from '../../domain/interfaces/Encryption';
import ActivityRepository from '../../domain/interfaces/repositories/ActivityRepository';
import ActivityRepositorySQLite from '../driven/repositories/ActivityRepositorySQLite';
import ActivityRegistrationRepository from '../../domain/interfaces/repositories/ActivityRegistrationRepository';
import ActivityRegistrationRepositorySQLite from '../driven/repositories/ActivityRegistrationRepositorySQLite';
import MessageRepositorySQLite from '../driven/repositories/MessageRepositorySQLite';
import MessageRepository from '../../domain/interfaces/repositories/MessageRepository';

const userRepository = new UserRepositorySQLite();
const encryption = new EncryptionLib();
const activityRepository = new ActivityRepositorySQLite();
const activityRegistrationRepository = new ActivityRegistrationRepositorySQLite();
const messageRepository = new MessageRepositorySQLite();

export interface Services {
  userRepository: UserRepository;
  encryption: Encryption;
  activityRepository: ActivityRepository;
  activityRegistrationRepository: ActivityRegistrationRepository;
  messageRepository: MessageRepository;
}

export default () => {
  return {
    userRepository,
    encryption,
    activityRepository,
    activityRegistrationRepository,
    messageRepository,
  };
};
