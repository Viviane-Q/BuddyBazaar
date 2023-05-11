import Message from '../../../domain/entities/Message';
import MessageRepository from '../../../domain/interfaces/repositories/MessageRepository';

class MessageRepositoryInMemory implements MessageRepository {
  private readonly messages: Message[] = [];

  persist(messages: Message[]): void {
    this.messages.push(...messages);
  }

  getAll(): Promise<Message[]> {
    return Promise.resolve(this.messages);
  }

  create(message: Message): Promise<Message | null> {
    this.messages.push(message);
    return Promise.resolve(message);
  }

  getByActivityId(activityId: number): Promise<Message[]> {
    return Promise.resolve(
      this.messages.filter((message) => message.activityId === activityId)
    );
  }
}

export default MessageRepositoryInMemory;
