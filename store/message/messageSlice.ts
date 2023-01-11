import { SessionMenu } from '@/types/menu';
import { SelectStudentList } from '@/types/selectStudent';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { InitialState } from './type';

const initialState: InitialState = {
  selectStudentList: [],
};

export const messageSlice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    setSelectStudentList: state => {
      const { getSession } = sessionStorageUtil();
      const messageData = getSession<SelectStudentList>(SessionMenu.SELECTSTUDENTLIST);
      state.selectStudentList = messageData;
    },
  },
});
export const getSelectStudentList = (state: RootState) => state.message.selectStudentList;
export const { setSelectStudentList } = messageSlice.actions;
export default messageSlice.reducer;
