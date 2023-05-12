import Message from '../../../domain/entities/Message';
import MessageRepository from '../../../domain/interfaces/repositories/MessageRepository';

class MessageRepositoryInMemory implements MessageRepository {
  private readonly messages: Message[] = [];

  persist(messages: Message[]): void {
    this.messages.push(...messages);
  }

  clear(): void {
    this.messages.splice(0, this.messages.length);
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

  getLastMessagesForActivities(activitiesId: number[]): Promise<Message[]> {
    const lastMessages: Message[] = [];
    activitiesId.forEach((activityId) => {
      const messagesForActivity = this.messages.filter(
        (message) => message.activityId === activityId
      );
      if (messagesForActivity.length > 0) {
        lastMessages.push(messagesForActivity[messagesForActivity.length - 1]);
      }
    });
    return Promise.resolve(lastMessages);
  }
}

export default MessageRepositoryInMemory;
