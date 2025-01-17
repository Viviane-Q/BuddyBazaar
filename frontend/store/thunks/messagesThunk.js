import { createAsyncThunk } from '@reduxjs/toolkit';
import getSocket from '../../socket';
import {
  addMessage,
  setMessages,
  setLastMessageByActivity,
} from '../slices/messagesSlice';
import Constants from 'expo-constants';
const BACKEND_URL = Constants.expoConfig.extra.backendUrl;

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (args, thunkAPI) => {
    const { content, activityId } = args;
    const { token } = thunkAPI.getState().auth;
    const socket = getSocket(token);
    socket.emit('message:create', { content, activityId }, (message) => {
      // update message list
      thunkAPI.dispatch(addMessage(message));
    });
  }
);

export const joinRoom = createAsyncThunk(
  'messages/joinRoom',
  async (args, thunkAPI) => {
    const { activityId } = args;
    const { token } = thunkAPI.getState().auth;
    const socket = getSocket(token);
    socket.emit('room:join', { activityId });
  }
);

export const listenToMessages = createAsyncThunk(
  'messages/listenToMessages',
  async (args, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    const socket = getSocket(token);
    if (!socket.hasListeners('message:emit')) {
      socket.on('message:emit', (message) => {
        // update message list
        thunkAPI.dispatch(addMessage(message));
      });
    }
  }
);

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (args, thunkAPI) => {
    const { activityId } = args;
    const { token } = thunkAPI.getState().auth;
    const response = await fetch(
      `${BACKEND_URL}/api/activities/${activityId}/messages`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      thunkAPI.dispatch(setMessages(data.messages));
    }
    return Promise.resolve({ res: data, error: !response.ok });
  }
);

export const getLastMessages = createAsyncThunk(
  'messages/getLastMessages',
  async (args, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    const response = await fetch(`${BACKEND_URL}/api/messages/last`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: `${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      thunkAPI.dispatch(setLastMessageByActivity(data.messages));
    }
    return Promise.resolve({ res: data, error: !response.ok });
  }
);
