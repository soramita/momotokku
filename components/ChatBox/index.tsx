import React, { ChangeEvent, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import styleModule from './style.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import useStudentMessage from '@/hooks/useStudentMessage';
import selectStudentMessage from '@/utils/selectStudentMessage';
import { v4 as uuid } from 'uuid';
import { SessionMenu } from '@/types/menu';
import { MessageList } from '@/types/message';
import { StudentInfo } from '../StudentList/type';
import teachInfo from '@/config/teachInfo';
import createImgUrl from '@/utils/createImgUrl';
import Modal from '../Modal';
import { expansionSvgList, stickerList } from './config';
const Content = styled.div`
  height: 100%;
  padding: 17px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const StudentMessageBox = styled.div`
  width: 100%;
  display: flex;
  .msg-name {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 5px;
  }
  .msg-content {
    background-color: #4c5b70;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    width: 100%;
    color: white;
    word-wrap: break-word;
    position: relative;
    font-size: 18px;
  }
  .msg-content::before {
    content: '';
    position: absolute;
    border-left: 5px solid #4c5b70;
    border-right: 5px solid transparent;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    left: 0;
    top: 20px;
    transform-origin: 0 0;
    transform: rotate(180deg);
  }
  .img-content {
    border: 1px solid #e7ebec;
    border-radius: 10px;
  }
`;
const TeachMessageBox = styled(StudentMessageBox)`
  justify-content: end;
  .msg-content::before {
    left: 100%;
    top: 15px;
    transform: rotate(0deg);
  }
`;
const ControlBox = styled.div`
  background-color: #e9e9e9;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  svg {
    cursor: pointer;
  }
`;
const ExpansionButton = styled.div`
  border-radius: 50%;
  background-color: #4c5b70;
  width: 30px;
  height: 30px;
  position: relative;
  margin-right: 10px;
  transition: all 0.5s;
  cursor: pointer;
  ::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 22px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  ::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 22px;
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(90deg);
    left: 50%;
    top: 50%;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 20px;
  border: none;
  padding: 0 30px 0 10px;
  margin-left: 15px;
  box-sizing: border-box;
`;
const ExpansionBox = styled.div`
  max-height: 200px;
  min-height: 0px;
  transition: all 0.5s;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  border-top: 2px solid #cdd0d1;
  div {
    cursor: pointer;
  }
`;
const PersonSelectBox = styled.div`
  background-color: #4b5a6f;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  img {
    border-radius: 50%;
    cursor: pointer;
  }
  div {
    position: relative;
  }
`;
const StickerBox = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  background-color: #dce5ec;
`;

/**判断是否连续发言 */
const isContinuousSpeech = (messageList: MessageList, studentId: number) => {
  const index = messageList.length - 1;
  if (messageList.length == 0) return false;
  if (messageList[index].studentInfo.id === studentId) return true;
  return false;
};
/**判断当前选择的角色 */
const style = {
  zIndex: 999,
  top: '0',
  left: '0',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  position: 'absolute' as const,
  backgroundColor: 'rgba(0,0,0, .5)',
  cursor: 'pointer',
};
const ChatBox = () => {
  const router = useRouter();
  const { getSession } = sessionStorageUtil();

  const [selectStudent, { addMessage, reloadMessage }] = useStudentMessage(
    selectStudentMessage(getSession<StudentInfo>(SessionMenu.SELECTSTUDENT)?.id)
  );
  const [expansion, setExpansion] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [inputMessage, changeInputMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  //判断当前发言人是否为学生
  const [isStudentRole, changeIsStudentRole] = useState(true);

  const messageContentRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const handleExpansion = () => {
    setExpansion(!expansion);
    expansion ? setRotate(0) : setRotate(90);
  };
  /**输入聊天信息 */
  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != ' ') {
      changeInputMessage(e.target.value);
    }
  };
  /**自动滚动到聊天框底部 */
  const scrollToBottom = () => {
    if (messageContentRef && messageContentRef.current) {
      const { current } = messageContentRef;
      setTimeout(() => {
        current.scrollTop = current.scrollHeight;
      }, 300);
    }
  };
  /**上传图片 */
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const url = createImgUrl(e);
    sendMessage('image', url);
    e.target.value = '';
  };
  /**发送消息 */
  const sendMessage = (messageType: 'image' | 'text', imgUrl?: string) => {
    if (inputMessage.length != 0 || messageType === 'image') {
      const res = isContinuousSpeech(
        selectStudent.messageList,
        //此处判断当前的角色从而传递连续发言对象的id
        isStudentRole ? selectStudent.studentId : teachInfo.id
      );
      const message = {
        id: uuid(),
        content: imgUrl ? imgUrl : inputMessage,
        messageType,
        studentInfo: isStudentRole ? getSession<StudentInfo>(SessionMenu.SELECTSTUDENT) : teachInfo,
        continuousSpeech: res,
      };
      addMessage(message);
      changeInputMessage('');
    }
  };
  /**关闭Modal */
  const handleClose = () => {
    setModalVisible(false);
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
    scrollToBottom();
  }, [router.query.id, selectStudent.messageList.length]);
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Content ref={messageContentRef}>
        {selectStudent.messageList.map(item => {
          return item.studentInfo.id !== 0 ? (
            <StudentMessageBox key={item.id}>
              <div style={{ width: '75px' }}>
                {!item.continuousSpeech ? (
                  <div>
                    <Image
                      src={item.studentInfo.avatar}
                      width={60}
                      height={60}
                      alt={''}
                      style={{ borderRadius: '50%' }}
                    ></Image>
                  </div>
                ) : null}
              </div>
              <div style={{ maxWidth: '450px' }}>
                {!item.continuousSpeech ? (
                  <div className="msg-name">{item.studentInfo.name}</div>
                ) : null}
                {item.messageType === 'text' ? (
                  <div
                    className={`msg-content ${
                      item.continuousSpeech ? styleModule.notFirstMessage : ''
                    }`}
                  >
                    {item.content}
                  </div>
                ) : (
                  <img src={item.content} width="100%" className="img-content" />
                )}
              </div>
            </StudentMessageBox>
          ) : (
            <TeachMessageBox key={item.id}>
              <div style={{ maxWidth: '450px' }}>
                {item.messageType === 'text' ? (
                  <div className="msg-content">{item.content}</div>
                ) : (
                  <img src={item.content} width="100%" className="img-content" />
                )}
              </div>
            </TeachMessageBox>
          );
        })}
      </Content>
      <ControlBox>
        <ExpansionButton
          style={expansion ? { transform: `rotate(${rotate}deg)` } : undefined}
          className={`button ${expansion ? styleModule.expansion : undefined}`}
          onClick={handleExpansion}
          title="展开"
        ></ExpansionButton>
        <div style={{ position: 'relative', width: '500px', display: 'flex' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            className="button"
            onClick={() => {
              uploadRef.current?.click();
            }}
          >
            <path
              d="M64 6.7v50.6H0V6.7zm-20.6 9a6.4 6.4 0 100 12.8 6.4 6.4 0 000-12.8zm14 33.3l-9.3-14.3a3.1 3.1 0 00-5-.4l-5.6 6.4-10-15.4a3.1 3.1 0 00-5.3 0L6.5 49h51z"
              strokeWidth="8"
              fill="#4C5B70"
            ></path>
          </svg>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={uploadRef}
            onChange={e => uploadImg(e)}
          />
          <Input placeholder="Aa" value={inputMessage} onChange={e => handleChangeMessage(e)} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            height="28"
            style={{ position: 'absolute', right: '0', top: '1px' }}
            className="button"
            onClick={() => setModalVisible(true)}
          >
            <path d="M32 12c11.028 0 20 8.972 20 20s-8.972 20-20 20-20-8.972-20-20 8.972-20 20-20zm0-4C18.746 8 8 18.746 8 32s10.746 24 24 24 24-10.746 24-24S45.254 8 32 8zm11.014 27.882c-3.024 2.39-6.348 3.862-11.012 3.862-4.668 0-7.992-1.472-11.016-3.862l-.986.986C22.254 40.308 26.4 44 32.002 44c5.6 0 9.744-3.692 11.998-7.132zM25 24a3 3 0 100 6 3 3 0 000-6zm14 0a3 3 0 100 6 3 3 0 000-6z"></path>
          </svg>
          <Modal title="贴纸" visible={modalVisible} onClose={handleClose} width={700}>
            <StickerBox>
              {stickerList.map((item, index) => {
                return (
                  <img
                    src={item.path}
                    key={index}
                    style={{ width: '150px', backgroundColor: 'white' }}
                  />
                );
              })}
            </StickerBox>
          </Modal>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="32"
          height="32"
          onClick={() => sendMessage('text')}
        >
          <path
            d="M56 8L44 52 28 38l15-17-21 15-14-4zM26 41v15l7-9z"
            fill={inputMessage.length ? '#4C5B70' : '#bfc2c8'}
            className={inputMessage.length ? 'button' : ''}
          ></path>
        </svg>
      </ControlBox>
      <ExpansionBox style={{ height: expansion ? '200px' : '0px' }}>
        {expansionSvgList.map((item, index) => {
          return (
            <div key={index} title={item.title}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40">
                <path d={item.d} fill={item.fill}></path>
              </svg>
            </div>
          );
        })}
      </ExpansionBox>
      <PersonSelectBox>
        <div
          style={{ position: 'relative' }}
          className="button"
          onClick={() => changeIsStudentRole(true)}
        >
          <div style={!isStudentRole ? style : {}}></div>
          <Image src={teachInfo.avatar} width={44} height={44} alt="" />
        </div>
        <div
          style={{ position: 'relative' }}
          className="button"
          onClick={() => changeIsStudentRole(false)}
        >
          <div style={isStudentRole ? style : {}}></div>
          <Image src={teachInfo.avatar} width={44} height={44} alt="" />
        </div>
      </PersonSelectBox>
    </div>
  );
};
export default ChatBox;
