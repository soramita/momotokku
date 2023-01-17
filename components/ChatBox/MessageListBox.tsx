import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import styleModule from './style.module.scss';
import Image from 'next/image';
import { SelectStudent, SelectStudentList } from '@/types/selectStudent';
import selectStudentMessage from '@/utils/selectStudentMessage';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import { SessionMenu } from '@/types/menu';
const Content = styled.div`
  height: 100%;
  padding: 17px;
  padding-bottom: 0;
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
    margin-bottom: 8px;
    padding: 8px;
  }
  .reply-content {
    min-width: 525px;
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    padding: 10px;
    padding-bottom: 0;
    color: #4c5b70;
    font-weight: 600;
    font-size: 18px;
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
const ReplyInput = styled.div`
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  text-align: center;
  padding: 10px;
  min-height: 40px;
  color: #4c5b70;
  font-weight: 600;
`;

type Props = {
  selectStudent: SelectStudent;
};
/**选中reply时的样式 */
const activeReplyStyle = {
  boxShadow: '0 0 1px 2px rgba(255, 179, 66, 0.9)',
};
const MessageListBox: FC<Props> = ({ selectStudent }) => {
  const { setSession, getSession } = sessionStorageUtil();
  const [activeReply, changeActiveReply] = useState('');
  const messageContentRef = useRef<HTMLDivElement>(null);
  /**自动滚动到聊天框底部 */
  const scrollToBottom = () => {
    if (messageContentRef && messageContentRef.current) {
      const { current } = messageContentRef;
      setTimeout(() => {
        current.scrollTop = current.scrollHeight;
      }, 300);
    }
  };
  const replyChange = (e: ChangeEvent<HTMLElement>, messageId: string, replyId: string) => {
    const res = selectStudentMessage(selectStudent.studentId);
    //失去焦点时清空选中样式
    changeActiveReply('');
    try {
      res.messageList.forEach(item => {
        if (item.id === messageId) {
          item.body?.forEach(item => {
            if (item.id === replyId) {
              item.content = e.target.innerText;
              throw new Error('');
            }
          });
        }
      });
    } catch (err) {
      const newList = getSession<SelectStudentList>(SessionMenu.SELECTSTUDENTLIST).map(item => {
        if (item.studentId === res.studentId) {
          item = res;
        }
        return item;
      });
      setSession(SessionMenu.SELECTSTUDENTLIST, newList);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [selectStudent.messageList.length]);
  return (
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
                <div className="msg-content">{item.content}</div>
              ) : (
                <img src={item.content} width="100%" className="img-content" />
              )}
            </div>
          </StudentMessageBox>
        ) : (
          <TeachMessageBox key={item.id}>
            <div style={{ maxWidth: '525px' }}>
              {item.messageType === 'text' ? (
                <div
                  className={`msg-content ${
                    item.continuousSpeech ? styleModule.notFirstMessage : ''
                  }`}
                >
                  {item.content}
                </div>
              ) : item.messageType === 'image' ? (
                <img src={item.content} width="450" className="img-content" />
              ) : item.messageType === 'reply' ? (
                <div className="reply-content">
                  <div style={{ borderLeft: '2px solid #3594f9', paddingLeft: 10 }}>回复</div>
                  <div style={{ borderTop: '1px solid #d8d8d8', margin: '8px 0' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {item.body
                      ? item.body.map(reply => {
                          return (
                            <ReplyInput
                              key={reply.id}
                              contentEditable
                              suppressContentEditableWarning
                              style={activeReply === reply.id ? activeReplyStyle : {}}
                              onBlur={e => replyChange(e, item.id, reply.id)}
                              onClick={() => changeActiveReply(reply.id)}
                            >
                              {reply.content}
                            </ReplyInput>
                          );
                        })
                      : null}
                  </div>
                </div>
              ) : (
                <div>plot</div>
              )}
            </div>
          </TeachMessageBox>
        );
      })}
    </Content>
  );
};
export default MessageListBox;
