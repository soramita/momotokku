import { StudentInfo } from '@/components/StudentList/type';
import { SessionMenu } from '@/types/menu';
import { Message, MessageList } from '@/types/message';
import { SelectStudent, SelectStudentList } from '@/types/selectStudent';
import selectStudentMessage from '@/utils/selectStudentMessage';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import { useState } from 'react';

type AddMessage = (message: Message) => void;

type RemoveMessage = (msgId: string) => void;

type ClearMessage = () => void;

type ReloadMessage = () => void;

type UseStudentMessage = (_selectStudent: SelectStudent) => [
  SelectStudent,
  {
    addMessage: AddMessage;
    removeMessage: RemoveMessage;
    clearMessage: ClearMessage;
    /**切换聊天时清空当前保存状态 */
    reloadMessage: ReloadMessage;
  }
];

type SaveSession = (studentId: number, changeInfo: MessageList) => void;

//修改完成后做本地存储
const saveSession: SaveSession = (studentId, changeInfo) => {
  const { getSession, setSession } = sessionStorageUtil();
  const sessionRes = getSession<SelectStudentList>(SessionMenu.SELECTSTUDENTLIST);
  const newObj = sessionRes.map(item => {
    if (item.studentId == studentId) {
      item.messageList = changeInfo;
    }
    return item;
  });
  setSession(SessionMenu.SELECTSTUDENTLIST, newObj);
};

const useStudentMessage: UseStudentMessage = _selectStudent => {
  const [selectStudent, setMessageList] = useState(_selectStudent);
  const { getSession } = sessionStorageUtil();
  const addMessage: AddMessage = message => {
    selectStudent.messageList.push(message);
    setMessageList({ ...selectStudent });
    saveSession(_selectStudent.studentId, selectStudent.messageList);
  };
  const removeMessage: RemoveMessage = msgId => {
    const newMessageList = selectStudent.messageList.filter(item => item.id != msgId);
    setMessageList({ ...selectStudent });
    saveSession(_selectStudent.studentId, newMessageList);
  };
  const clearMessage: ClearMessage = () => {
    _selectStudent.messageList = [];
    setMessageList({ ...selectStudent });
    saveSession(_selectStudent.studentId, _selectStudent.messageList);
  };
  const reloadMessage: ReloadMessage = () => {
    setMessageList({
      ...selectStudentMessage(getSession<StudentInfo>(SessionMenu.SELECTSTUDENT).id),
    });
  };
  return [selectStudent, { addMessage, removeMessage, clearMessage, reloadMessage }];
};
export default useStudentMessage;