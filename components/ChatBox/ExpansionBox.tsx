import downloadMessage from '@/utils/downloadMessage';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import { expansionSvgList } from './config';
import { ClearMessage, SendMessage, SetMode } from './types';
const ExpansionContainer = styled.div`
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
const ModalButton = styled.div`
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #d1d1d1;
  border-radius: 3px;
  transform: skew(-10deg);
  cursor: pointer;
  transition: all 0.3s;
  color: #4c5b70;
  :hover {
    background-color: #f19fb5;
    color: white;
  }
`;
type Props = {
  expansion: boolean;
  sendMessage: SendMessage;
  clearMessage: ClearMessage;
  setMode: SetMode;
  mode: boolean;
};
const ExpansionBox: FC<Props> = ({ expansion, sendMessage, clearMessage, setMode, mode }) => {
  const [visible, setVisible] = useState(false);
  //展开控制栏后的控件配置
  const controls = (type: string) => {
    if (type === 'reply') {
      if (mode) return;
      sendMessage('reply');
    }
    if (type === 'plot') {
      if (mode) return;
      sendMessage('plot');
    }
    if (type === 'download') {
      if (mode) return;
      const content = document.getElementById('content');
      downloadMessage(content as HTMLElement);
    }
    if (type === 'clear') {
      setVisible(true);
    }
    if (type === 'remove') {
      setMode(!mode);
    }
  };
  const onClose = () => {
    setVisible(false);
  };
  /**清空消息 */
  const clearOk = () => {
    clearMessage();
    onClose();
  };
  return (
    <>
      <ExpansionContainer style={{ height: expansion ? '200px' : '0px' }}>
        {expansionSvgList.map((item, index) => {
          return (
            <div key={index} title={item.title} onClick={() => controls(item.type)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40">
                <path d={item.d} fill={mode ? item.disableFill : item.fill}></path>
              </svg>
            </div>
          );
        })}
      </ExpansionContainer>
      <Modal title="清空消息" visible={visible} onClose={onClose} width={400} height={150}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <div>是否清空消息？</div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              marginTop: '20px',
            }}
          >
            <ModalButton>
              <div style={{ transform: 'skew(10deg)' }} onClick={() => clearOk()}>
                确定
              </div>
            </ModalButton>
            <ModalButton>
              <div style={{ transform: 'skew(10deg)' }} onClick={() => onClose()}>
                取消
              </div>
            </ModalButton>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ExpansionBox;
