import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../store/slices/authSlice'
import activitieSlice from './slices/activitiesSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    activities: activitieSlice,
  },
})
