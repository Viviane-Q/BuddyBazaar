import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUserActivities } from '../slices/activitiesSlice';

// import { BACKEND_URL } from "@env";
const BACKEND_URL = 'http://localhost:3000';

export const getOwnActivities = createAsyncThunk(
  'activities/getOwnActivities',
  async (args, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    const response = await fetch(`${BACKEND_URL}/api/activities/by-user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: `${token}`,
      },
    });
    const data = await response.json();
    if (data.activities) {
      thunkAPI.dispatch(setUserActivities(data.activities));
    }
    return Promise.resolve({ res: data, error: !response.ok });
  }
);

export const postNewActivity = createAsyncThunk(
  'activities/postNewActivity',
  async (args, thunkAPI) => {
    const { activity } = args;
    const { token } = thunkAPI.getState().auth;
    const response = await fetch(`${BACKEND_URL}/api/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: `${token}`,
      },
      body: JSON.stringify(activity),
    });
    const data = await response.json();
    return Promise.resolve({ res: data, error: !response.ok });
  }
);
