import { createAsyncThunk } from '@reduxjs/toolkit';
import getSocket from '../../socket';
import { addMessage } from '../slices/messagesSlice';

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
    socket.join(`activity:${activityId}`);
  }
);

export const listenToMessages = createAsyncThunk(
  'messages/listenToMessages',
  async (args, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    const socket = getSocket(token);
    socket.on('message:emit', (message) => {
      // update message list
      thunkAPI.dispatch(addMessage(message));
    });
  }
);

// TODO leave room and stop listening to messages
