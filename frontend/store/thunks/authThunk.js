import { createAsyncThunk } from '@reduxjs/toolkit';
import { BACKEND_URL } from "@env";
import User from '../../entities/User'
import { setAuthToken } from '../slices/authSlice';

export const registerUser = createAsyncThunk('users/registerUser', async (args, thunkAPI) => {
  const { name, email } = thunkAPI.getState().auth;
  const { password } = args;
  const response = await fetch(`${BACKEND_URL}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await response.json();
  return Promise.resolve(data.message);
});

export const signInUser = createAsyncThunk('users/signInUser', async (args, thunkAPI) => {
  const { email } = thunkAPI.getState().auth;
  const { password } = args;
  console.log('sign in', email, password)
  const response = await fetch(`${BACKEND_URL}/api/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.token) {
    // set token in users cookies
    window.document.cookie = `token=${data.token}`;
  }
  return Promise.resolve(data.message);
});

