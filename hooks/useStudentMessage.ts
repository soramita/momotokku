import { StudentInfo } from '@/components/StudentList/type';
import { SessionMenu } from '@/types/menu';
import { Message, MessageList } from '@/types/message';
import { SelectStudent, SelectStudentList } from '@/types/selectStudent';
import selectStudentMessage from '@/utils/selectStudentMessage';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import { useState } from 'react';

type AddMessage = (message: Message) => void;

export type RemoveMessage = (msgId: string, type?: 'reply', replyId?: string) => void;

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
    //判断当前reply是否是连续创建
    if (message.messageType === 'reply' && selectStudent.messageList.length != 0 && message.body) {
      const index = selectStudent.messageList.length;
      if (selectStudent.messageList[index - 1].messageType === message.messageType) {
        selectStudent.messageList[index - 1].body?.push(message.body[0]);
      } else {
        selectStudent.messageList.push(message);
      }
    } else {
      selectStudent.messageList.push(message);
    }
    setMessageList({ ...selectStudent });
    saveSession(_selectStudent.studentId, selectStudent.messageList);
  };
  const removeMessage: RemoveMessage = (msgId, type, replyId) => {
    if (type === 'reply') {
      _selectStudent.messageList = selectStudent.messageList.map(item => {
        if (item.id === msgId) {
          item.body = item.body?.filter(item => item.id != replyId);
        }
        return item;
      });
    } else {
      _selectStudent.messageList = selectStudent.messageList.filter(item => item.id != msgId);
    }
    setMessageList({ ..._selectStudent });
    saveSession(_selectStudent.studentId, _selectStudent.messageList);
  };
  const clearMessage: ClearMessage = () => {
    _selectStudent.messageList = [];
    setMessageList({ ..._selectStudent });
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
