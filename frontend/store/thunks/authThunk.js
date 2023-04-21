import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL } from "@env";
import User from '../../entities/User'

export const registerUser = createAsyncThunk('users/registerUser', async (payload) => {
  const { name, email, password } = payload;
  const response = await fetch(`${BACKEND_URL}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  return new User(data.name, data.email, data.password);
});
