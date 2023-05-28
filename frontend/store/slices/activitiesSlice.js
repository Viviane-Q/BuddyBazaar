import { createSlice } from '@reduxjs/toolkit';

const initialUserActivities = [];
const initialSearchedActivities = [];

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    userActivities: initialUserActivities,
    searchedActivities: initialSearchedActivities,
    selectedActivity: null,
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
    },
    setSelectedActivity: (state, action) => {
      state.selectedActivity = action.payload;
    }
  },
});

export const { addUserActivity, setUserActivities, setSearchedActivities, setSelectedActivity } = activitiesSlice.actions;

export default activitiesSlice.reducer;
