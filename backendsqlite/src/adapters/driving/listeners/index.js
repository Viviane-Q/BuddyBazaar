import messageListener from './message';
import roomListener from './room';

const initListeners = (io, services) => {
  io.on('connection', function (socket) {
    roomListener(socket, services);
    messageListener(socket, services);
  });
};

module.exports = initListeners;
