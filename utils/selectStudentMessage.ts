import sessionStorageUtil from '@/utils/sessionStorage-util';
import { SelectStudentList } from '@/types/selectStudent';
import { MessageList } from '@/types/message';

type SelectStudentMessage = (studentId: number) => boolean | MessageList;
/**查询与学生的聊天记录 */
const selectStudentMessage: SelectStudentMessage = studentId => {
  const { getSession, setSession } = sessionStorageUtil();
  const selectStudentList: SelectStudentList = getSession('select_student_list');
  if (!selectStudentList) {
    setSession('select_student_list', [] as SelectStudentList);
  }
  const res = selectStudentList.find(item => item.studentId == studentId);
  if (res) return res.MessageList;
  else return false;
};
export default selectStudentMessage;
