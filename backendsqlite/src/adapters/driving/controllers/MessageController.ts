import GetLastMessagesByUserId from '../../../core/usecases/Message/GetLastMessagesByUserId';
import GetMessagesByActivityId from '../../../core/usecases/Message/GetMessagesByActivityId';
import Message from '../../../domain/entities/Message';
import { Services } from '../../config/services';
import { CustomRequest } from '../types/CustomRequest';

const getMessages = (req: CustomRequest): Promise<Message[]> => {
  const services = req.context.services as Services;
  return GetMessagesByActivityId({
    activityId: parseInt(req.params.activityId as string),
    messageRepository: services.messageRepository,
  });
};

const getLastMessages = (req: CustomRequest): Promise<Message[]> => {
  const services = req.context.services as Services;
  return GetLastMessagesByUserId({
    userId: req.user.id as number,
    activityRepository: services.activityRepository,
    messageRepository: services.messageRepository,
  });
};

export default {
  getMessages,
  getLastMessages,
};
