import messageListener from './message';

const initListeners = (io, services) => {
  io.on('connection', function (socket) {
    messageListener(socket, services);
  });
};

module.exports = initListeners;
