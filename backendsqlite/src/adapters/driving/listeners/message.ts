import Message from '../../../domain/entities/Message';
import CreateMessage from '../../../core/usecases/Message/CreateMessage';
import { Services } from '../../config/services';
import { Socket } from 'socket.io';
import { socketCan } from '../../../core/security/can';
import { Resources } from '../../../core/security/Resources';
import { Actions } from '../../../core/security/Actions';

const messageListener = (socket: Socket, services: Services) => {
  socket.on('message:create', async (payload, callback) => {
    try {
      payload = await socketCan(Resources.MESSAGE, Actions.CREATE, {
        ...payload,
        token: socket.handshake.auth.token,
        context: { services },
      });
      const message = new Message(
        payload.content,
        payload.user.id,
        payload.activityId
      );
      const createdMessage = await CreateMessage({
        message,
        messageRepository: services.messageRepository,
      });
      if (createdMessage) {
        const serializedMessage = createdMessage.toObject();
        serializedMessage.user = payload.user;
        socket
          .in(`activity:${payload.activityId}`)
          .emit('message:emit', serializedMessage);
        callback(serializedMessage);
      }
      callback(null);
    } catch (error) {
      callback(null);
    }
  });
};

export default messageListener;
