import sessionStorageUtil from '@/utils/sessionStorage-util';
import { SelectStudent, SelectStudentList } from '@/types/selectStudent';
import { SessionMenu } from '@/types/menu';

type SelectStudentMessage = (studentId: number) => SelectStudent;
/**查询与学生的聊天记录 */
const selectStudentMessage: SelectStudentMessage = studentId => {
  const { getSession, setSession } = sessionStorageUtil();
  let selectStudentList: SelectStudentList = getSession(SessionMenu.SELECTSTUDENTLIST);
  if (!selectStudentList) {
    setSession(SessionMenu.SELECTSTUDENTLIST, [] as SelectStudentList);
    selectStudentList = getSession(SessionMenu.SELECTSTUDENTLIST);
  }
  const result = selectStudentList.find(item => item.studentId == studentId);
  if (!result) {
    console.log(studentId);

    if (studentId) {
      selectStudentList.push({ studentId, messageList: [] });
      setSession(SessionMenu.SELECTSTUDENTLIST, selectStudentList);
      return {
        studentId,
        messageList: [],
      };
    } else {
      return {
        studentId: 0,
        messageList: [],
      };
    }
  } else {
    return result;
  }
};
export default selectStudentMessage;
