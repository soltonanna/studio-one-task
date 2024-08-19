import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer
  }
});

export default store; // Ensure default export here
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
