import { Locales } from '@/types/locales';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalState } from './type';

const initialState: GlobalState = {
  locales: {
    code: 'zh-CN',
    language: '简体中文',
  },
};

export const globlaState = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLocales: (state, action: PayloadAction<Locales>) => {
      if (action.payload) {
        state.locales = action.payload;
      }
    },
  },
});
export const { setLocales } = globlaState.actions;
export default globlaState.reducer;
