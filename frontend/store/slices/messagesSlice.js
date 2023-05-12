import { createSlice } from '@reduxjs/toolkit';

const initialMessages = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: initialMessages,
    lastMessageByActivity: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setLastMessageByActivity: (state, action) => {
      state.lastMessageByActivity = action.payload;
    },
  },
});

export const { addMessage, setMessages, setLastMessageByActivity } =
  messagesSlice.actions;

export default messagesSlice.reducer;
