import Message from '../../../domain/entities/Message';
import MessageRepository from '../../../domain/interfaces/repositories/MessageRepository';

export default ({
  activityId,
  messageRepository,
}: {
  activityId: number;
  messageRepository: MessageRepository;
}): Promise<Message[]> => {
  return messageRepository.getByActivityId(activityId);
};
