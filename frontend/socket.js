import { io } from 'socket.io-client';
import Constants from 'expo-constants';
const BACKEND_URL = Constants.expoConfig.extra.backendUrl;

let socket;
const getSocket = (token) => {
  if (!socket) {
    socket = io(BACKEND_URL, {
      auth: {
        token,
      },
    });
  }
  return socket;
};

export default getSocket;
