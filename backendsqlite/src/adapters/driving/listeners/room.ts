import { Socket } from 'socket.io';
import { Actions } from '../../../core/security/Actions';
import { Resources } from '../../../core/security/Resources';
import { socketCan } from '../../../core/security/can';
import { Services } from '../../config/services';

const roomListener = (socket: Socket, services: Services) => {
  socket.on('room:join', async function (payload) {
    payload = await socketCan(Resources.MESSAGE, Actions.READ, {
      ...payload,
      token: socket.handshake.auth.token,
      context: { services },
    });
    socket.join(`activity:${payload.activityId}`);
  });
};

export default roomListener;
