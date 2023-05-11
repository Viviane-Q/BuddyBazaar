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
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
