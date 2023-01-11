import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './global/globalSlice';
import messageSlice from './message/messageSlice';

export const store = configureStore({
  reducer: {
    global: globalSlice,
    message: messageSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
