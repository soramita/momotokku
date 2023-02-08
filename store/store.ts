import { configureStore } from '@reduxjs/toolkit';
import selectRoleReducer from './selectRoleReducer';
export const store = configureStore({
  reducer: {
    selectRole: selectRoleReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
