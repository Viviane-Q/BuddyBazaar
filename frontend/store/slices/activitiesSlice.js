import { createSlice } from '@reduxjs/toolkit';

const initialUserActivities = [];
const initialSearchedActivities = [];

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    userActivities: initialUserActivities,
    searchedActivities: initialSearchedActivities,
  },
  reducers: {
    addUserActivity: (state, action) => {
      state.userActivities.push(action.payload);
    },
    setUserActivities: (state, action) => {
      state.userActivities = action.payload;
    },
    setSearchedActivities: (state, action) => {
      state.searchedActivities = action.payload;
    }
  },
});

export const { addUserActivity, setUserActivities, setSearchedActivities } = activitiesSlice.actions;

export default activitiesSlice.reducer;
