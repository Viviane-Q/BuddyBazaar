import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../store/slices/authSlice'
import activitieSlice from './slices/activitiesSlice'
import messagesSlice from './slices/messagesSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    activities: activitieSlice,
    messages: messagesSlice,
  },
})
