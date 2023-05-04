import { createSlice } from '@reduxjs/toolkit';

const initialUserActivities = [];

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    userActivities: initialUserActivities,
  },
  reducers: {
    addUserActivity: (state, action) => {
      state.userActivities.push(action.payload);
    },
    setUserActivities: (state, action) => {
      state.userActivities = action.payload;
    },
  },
});

export const { addUserActivity, setUserActivities } = activitiesSlice.actions;

export default activitiesSlice.reducer;
