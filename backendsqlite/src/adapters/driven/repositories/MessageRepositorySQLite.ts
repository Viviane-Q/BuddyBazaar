import Message from '../../../domain/entities/Message';
import User from '../../../domain/entities/User';
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

  async getByActivityId(activityId: number): Promise<Message[]> {
    const seqMessages = await models.messages.findAll({
      include: {
        model: models.users,
      },
      where: {
        activityId,
      },
    });
    return seqMessages.map((message: any) => {
      const sender = new User(
        message.user.id,
        message.user.name,
        message.user.email
      );
      return new Message(
        message.content,
        message.userId,
        message.activityId,
        message.createdAt,
        message.id,
        sender
      );
    });
  }

  async getLastMessagesForActivities(
    activitiesId: number[]
  ): Promise<Message[]> {
    const seqMessages = await Promise.all(
      activitiesId.map(async (activityId) => {
        const seqMessage = await models.messages.findOne({
          include: {
            model: models.users,
          },
          where: {
            activityId,
          },
          order: [['createdAt', 'DESC']],
        });
        return seqMessage;
      })
    );
    return seqMessages
      .filter((seq) => !!seq)
      .map((message: any) => {
        const sender = new User(
          message.user.id,
          message.user.name,
          message.user.email
        );
        return new Message(
          message.content,
          message.userId,
          message.activityId,
          message.createdAt,
          message.id,
          sender
        );
      });
  }
}

export default MessageRepositorySQLite;
