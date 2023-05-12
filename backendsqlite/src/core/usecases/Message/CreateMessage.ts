import Message from '../../../domain/entities/Message';
import MessageRepository from '../../../domain/interfaces/repositories/MessageRepository';

export default ({
  message,
  messageRepository,
}: {
  message: Message;
  messageRepository: MessageRepository;
}): Promise<Message | null> => {
  return messageRepository.create(message);
};
