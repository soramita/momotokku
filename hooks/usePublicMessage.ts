import { SessionMenu } from '@/types/menu';
import { Message, MessageList } from '@/types/message';
import deepClone from '@/utils/deepClone';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import { useEffect, useState } from 'react';

type AddMessage = (message: Message) => void;

export type RemoveMessage = (msgId: string, type?: 'reply', replyId?: string) => void;

type ClearMessage = () => void;

type UsePublicMessage = () => [
  MessageList,
  {
    addMessage: AddMessage;
    removeMessage: RemoveMessage;
    clearMessage: ClearMessage;
  }
];

type SaveSession = (messageList: MessageList) => void;

//修改完成后做本地存储
const { setSession, getSession } = sessionStorageUtil();
const saveSession: SaveSession = messageList => {
  setSession(SessionMenu.PUBLIC_MESSAGE, messageList);
};

const usePublicMessage: UsePublicMessage = () => {
  const [messageList, setMessageList] = useState<MessageList>([]);
  const copyMessageList = deepClone<MessageList>(messageList || []);
  const addMessage: AddMessage = message => {
    //判断当前reply是否是连续创建
    if (message.messageType === 'reply' && copyMessageList.length != 0 && message.body) {
      const index = copyMessageList.length;
      if (copyMessageList[index - 1].messageType === message.messageType) {
        copyMessageList[index - 1].body?.push(message.body[0]);
      } else {
        copyMessageList.push(message);
      }
    } else {
      copyMessageList.push(message);
    }
    setMessageList(copyMessageList);
    saveSession(copyMessageList);
  };
  const removeMessage: RemoveMessage = (msgId, type, replyId) => {
    let newObj;
    if (type === 'reply') {
      newObj = copyMessageList.map(item => {
        if (item.id === msgId) {
          item.body = item.body?.filter(item => item.id != replyId);
        }
        return item;
      });
    } else {
      newObj = copyMessageList.filter(item => item.id != msgId);
    }
    setMessageList(newObj);
    saveSession(newObj);
  };
  const clearMessage: ClearMessage = () => {
    setMessageList([]);
    saveSession([]);
  };
  useEffect(() => {
    setMessageList(getSession<MessageList>(SessionMenu.PUBLIC_MESSAGE));
  }, []);
  return [messageList, { addMessage, removeMessage, clearMessage }];
};
export default usePublicMessage;
