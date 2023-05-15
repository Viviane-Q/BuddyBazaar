import { Socket } from 'socket.io';
import { Actions } from '../../../core/security/Actions';
import { Resources } from '../../../core/security/Resources';
import { socketCan } from '../../../core/security/can';
import { Services } from '../../config/services';

const roomListener = (socket: Socket, services: Services) => {
  socket.on('room:join', async function (payload) {
    try {
      payload = await socketCan(Resources.MESSAGE, Actions.READ, {
        ...payload,
        token: socket.handshake.auth.token,
        context: { services },
      });
      socket.rooms.forEach((room) => {
        if (room.includes('activity:')) {
          socket.leave(room);
        }
      });
      socket.join(`activity:${payload.activityId}`);
    } catch (error) {
      socket.disconnect();
    }
  });
};

export default roomListener;
