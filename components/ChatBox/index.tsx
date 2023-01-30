import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import useStudentMessage from '@/hooks/useStudentMessage';
import selectStudentMessage from '@/utils/selectStudentMessage';
import { v4 as uuid } from 'uuid';
import { SessionMenu } from '@/types/menu';
import { StudentInfo } from '../StudentList/type';
import teacherInfo from '@/config/teacherInfo';
import MessageListBox from './MessageListBox';
import { Message, MessageList } from '@/types/message';
import ControlBox from './ControlBox';
import { SendMessage } from './types';
import ExpansionBox from './ExpansionBox';
import SelectRoleBox from './SelectRoleBox';

/**判断是否连续发言 */
const isContinuousSpeech = (messageList: MessageList, studentId: number) => {
  const index = messageList.length - 1;
  if (messageList.length == 0) return false;
  if (messageList[index].studentInfo.id === studentId) return true;
  return false;
};

const ChatBox = () => {
  const router = useRouter();
  const { getSession } = sessionStorageUtil();
  const [selectStudent, { addMessage, reloadMessage, clearMessage: _clearMessage, removeMessage }] =
    useStudentMessage(selectStudentMessage(getSession<StudentInfo>(SessionMenu.SELECTSTUDENT)?.id));
  const [modalVisible, setModalVisible] = useState(false);
  /**关闭Modal */
  const handleClose = () => {
    setModalVisible(false);
  };
  /**控制控制栏的展开 */
  const [expansion, setExpansion] = useState(false);
  const [inputMessage, changeInputMessage] = useState('');

  //判断当前发言人是否为学生
  const [isStudentRole, changeIsStudentRole] = useState(true);

  //进入消息删除模式
  const [mode, setMode] = useState(false);

  /**发送消息 */
  const sendMessage: SendMessage = (messageType, imgUrl) => {
    const res = isContinuousSpeech(
      selectStudent.messageList,
      //此处判断当前的角色从而传递连续发言对象的id
      isStudentRole ? selectStudent.studentId : teacherInfo.id
    );
    let message = {} as Message;
    //文字消息
    if (messageType === 'text') {
      if (inputMessage.length != 0) {
        message = {
          id: uuid(),
          content: inputMessage,
          messageType,
          studentInfo: isStudentRole
            ? getSession<StudentInfo>(SessionMenu.SELECTSTUDENT)
            : teacherInfo,
          continuousSpeech: res,
        };
      } else {
        return;
      }
    }
    //图片消息
    if (messageType === 'image') {
      message = {
        id: uuid(),
        content: imgUrl,
        messageType,
        studentInfo: isStudentRole
          ? getSession<StudentInfo>(SessionMenu.SELECTSTUDENT)
          : teacherInfo,
        continuousSpeech: res,
      };
    }
    //回复
    if (messageType === 'reply') {
      message = {
        id: uuid(),
        body: [
          {
            id: uuid(),
            content: '',
          },
        ],
        messageType,
        studentInfo: teacherInfo,
        continuousSpeech: res,
      };
    }
    //羁绊剧情
    if (messageType === 'plot') {
      message = {
        id: uuid(),
        content: `前往${getSession<StudentInfo>(SessionMenu.SELECTSTUDENT).name}的羁绊剧情`,
        messageType,
        studentInfo: teacherInfo,
        continuousSpeech: res,
      };
    }
    addMessage(message);
    changeInputMessage('');
    handleClose();
  };
  /**清空消息 */
  const clearMessage = () => {
    _clearMessage();
  };
  useEffect(() => {
    if (!getSession(SessionMenu.SELECTSTUDENT)) {
      router.replace('/studentMessage');
    }
    try {
      reloadMessage();
    } catch (error) {
      router.replace('/studentMessage');
    }
  }, [router.query.id]);
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/**消息列表 */}
      <MessageListBox
        selectStudent={selectStudent}
        mode={mode}
        removeMessage={removeMessage}
      ></MessageListBox>
      {/**输入控制栏 */}
      <ControlBox
        sendMessage={sendMessage}
        changeInputMessage={changeInputMessage}
        setExpansion={setExpansion}
        handleClose={handleClose}
        setModalVisible={setModalVisible}
        expansion={expansion}
        modalVisible={modalVisible}
        inputMessage={inputMessage}
        mode={mode}
        setMode={setMode}
      ></ControlBox>
      {/**展开的控制栏 */}
      <ExpansionBox
        expansion={expansion}
        sendMessage={sendMessage}
        clearMessage={clearMessage}
        setMode={setMode}
        mode={mode}
      ></ExpansionBox>
      {/**角色选择栏 */}
      <SelectRoleBox
        changeIsStudentRole={changeIsStudentRole}
        isStudentRole={isStudentRole}
      ></SelectRoleBox>
    </div>
  );
};
export default ChatBox;
