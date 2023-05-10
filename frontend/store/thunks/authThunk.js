import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setName, setToken, setUserId } from '../slices/authSlice'
import Constants from 'expo-constants';
const BACKEND_URL = Constants.expoConfig.extra.backendUrl;

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
  return Promise.resolve({error:!response.ok,"message":data.message});
});

export const signInUser = createAsyncThunk('users/signInUser', async (args, thunkAPI) => {
  const { email } = thunkAPI.getState().auth;
  const { password } = args;
  const response = await fetch(`${BACKEND_URL}/api/users/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  let error = true;
  if (data.token) {
    error = false;
    // set token in asyncstorage
    AsyncStorage.setItem('token', data.token);
    // update store
    thunkAPI.dispatch(setToken(data.token));
  }
  return Promise.resolve({error,"message":data.message});
});

export const getUser = createAsyncThunk('users/getUser', async (args, thunkAPI) => {
  const { token } = thunkAPI.getState().auth;
  const response = await fetch(`${BACKEND_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
  });
  const data = await response.json();
  if (data) {
    // update store
    thunkAPI.dispatch(setUserId(data.user.id));
    thunkAPI.dispatch(setName(data.user.name));
  }
  return Promise.resolve({error:!response.ok,res:data});
});