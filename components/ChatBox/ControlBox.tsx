import React, { ChangeEvent, FC, SetStateAction, useRef, useState } from 'react';
import styleModule from './style.module.scss';
import Modal from '../Modal';
import styled from 'styled-components';
import createImgUrl from '@/utils/createImgUrl';
import { stickerList } from './config';
import { SendMessage, SetMode } from './types';
const ControlContainer = styled.div`
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
const RemoveMode = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  margin-left: 15px;
  text-align: center;
  background-color: #222222;
  color: white;
  cursor: pointer;
`;
const StickerBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #dce5ec;
  padding: 0 10px 10px 0;
  img {
    width: 25%;
    background-color: white;
    border-top: 10px solid #dce5ec;
    border-left: 10px solid #dce5ec;
    cursor: pointer;
  }
`;
type Props = {
  sendMessage: SendMessage;
  changeInputMessage: (e: SetStateAction<string>) => void;
  setExpansion: (e: SetStateAction<boolean>) => void;
  setModalVisible: (e: SetStateAction<boolean>) => void;
  handleClose: () => void;
  expansion: boolean;
  inputMessage: string;
  modalVisible: boolean;
  mode: boolean;
  setMode: SetMode;
};
const ControlBox: FC<Props> = ({
  sendMessage,
  changeInputMessage,
  setExpansion,
  setModalVisible,
  handleClose,
  modalVisible,
  expansion,
  inputMessage,
  mode,
  setMode,
}) => {
  const [rotate, setRotate] = useState(0);

  const uploadRef = useRef<HTMLInputElement>(null);
  //展开控制栏
  const handleExpansion = () => {
    setExpansion(!expansion);
    expansion ? setRotate(0) : setRotate(90);
  };
  //上传图片
  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const url = createImgUrl(e);
    sendMessage('image', url);
    e.target.value = '';
  };

  //输入聊天信息
  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value != ' ') {
      changeInputMessage(e.target.value);
    }
  };
  return (
    <ControlContainer>
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
        {mode ? (
          <RemoveMode onClick={() => setMode(false)}>取消删除模式</RemoveMode>
        ) : (
          <Input placeholder="Aa" value={inputMessage} onChange={e => handleChangeMessage(e)} />
        )}
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
                <img src={item.path} key={index} onClick={() => sendMessage('image', item.path)} />
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
    </ControlContainer>
  );
};
export default ControlBox;
