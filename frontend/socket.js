import { io } from "socket.io-client";
import Constants from 'expo-constants';
const BACKEND_URL = Constants.expoConfig.extra.backendUrl;

const socket = io(BACKEND_URL);

export default socket;