import { createSlice } from '@reduxjs/toolkit';

const initialMessages = [];

const messagesSlice = createSlice({
  name: 'activities',
  initialState: {
    messages: initialMessages,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
