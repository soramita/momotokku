import { StudentInfo } from '@/components/StudentList/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type InitialState = {
  nowSelectRole: StudentInfo;
};
const initialState: InitialState = {
  nowSelectRole: {} as StudentInfo,
};
export const selectRoleSlice = createSlice({
  name: 'selectRoleSlice',
  initialState,
  reducers: {
    setRole(state, actions: PayloadAction<StudentInfo>) {
      state.nowSelectRole = actions.payload;
    },
  },
});
export const { setRole } = selectRoleSlice.actions;
export const getRole = (state: RootState) => state.selectRole;
export default selectRoleSlice.reducer;
