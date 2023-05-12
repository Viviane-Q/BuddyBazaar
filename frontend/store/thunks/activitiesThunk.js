import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setUserActivities,
  setSearchedActivities,
} from '../slices/activitiesSlice';
import Constants from 'expo-constants';
const BACKEND_URL = Constants.expoConfig.extra.backendUrl;

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

export const getActivitiesByCategory = createAsyncThunk(
  'activities/getActivitiesByCategory',
  async (args, thunkAPI) => {
    const { category } = args;
    const response = await fetch(
      `${BACKEND_URL}/api/activities?category=${category}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      thunkAPI.dispatch(setSearchedActivities(data.activities));
    }
    return Promise.resolve({ res: data, error: !response.ok });
  }
);

export const getActivitiesByDateRange = createAsyncThunk(
  'activities/getActivitiesByCategory',
  async (args) => {
    const { startDate, endDate } = args;
    const response = await fetch(
      `${BACKEND_URL}/api/activities?startDate=${startDate}&endDate=${endDate}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return Promise.resolve({ data, error: !response.ok });
  }
);

export const deleteActivity = createAsyncThunk(
  'activities/deleteActivity',
  async (args, thunkAPI) => {
    const { id } = args;
    const { token } = thunkAPI.getState().auth;
    const response = await fetch(`${BACKEND_URL}/api/activities/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: `${token}`,
      },
    });
    const data = await response.json();
    return Promise.resolve({ res: data, error: !response.ok });
  }
);

export const updateActivity = createAsyncThunk(
  'activities/updateActivity',
  async (args, thunkAPI) => {
    const { activity } = args;
    const { token } = thunkAPI.getState().auth;
    const response = await fetch(
      `${BACKEND_URL}/api/activities/${activity.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`,
        },
        body: JSON.stringify(activity),
      }
    );
    const data = await response.json();
    return Promise.resolve({ res: data, error: !response.ok });
  }
);

export const registerForActivity = createAsyncThunk(
  'activities/registerForActivity',
  async (args, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    const { activityId } = args;
    const response = await fetch(
      `${BACKEND_URL}/api/activities/${activityId}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`,
        },
      })
    const data = await response.json();
    return Promise.resolve({ res: data, error: !response.ok });
  }
);

export const unregisterForActivity = createAsyncThunk(
  'activities/unregisterForActivity',
  async (args, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    const { activityId } = args;
    const response = await fetch(
      `${BACKEND_URL}/api/activities/${activityId}/unregister`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `${token}`,
        },
      })
    const data = await response.json();
    return Promise.resolve({ res: data, error: !response.ok });
  }
);