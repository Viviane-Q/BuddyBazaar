import Message from '../../../domain/entities/Message';
import MessageRepository from '../../../domain/interfaces/repositories/MessageRepository';
import models from '../models';

class MessageRepositorySQLite implements MessageRepository {
  async create(message: Message): Promise<Message | null> {
    try {
      const seqMessage = await models.messages.create(message.toObject());
      if (seqMessage) {
        return Promise.resolve(
          new Message(
            seqMessage.content,
            seqMessage.userId,
            seqMessage.activityId,
            seqMessage.createdAt,
            seqMessage.id
          )
        );
      }
      return Promise.resolve(null);
    } catch (error) {
      return Promise.resolve(null);
    }
  }

  getByActivityId(activityId: number): Promise<Message[]> {
    throw new Error('Method not implemented.');
  }
}

export default MessageRepositorySQLite;
