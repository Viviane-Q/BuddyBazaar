import messageListener from './message';

const initListeners = (io) => {
  io.on('connection', function (socket) {
    messageListener(socket);
  });
};

module.exports = initListeners;
