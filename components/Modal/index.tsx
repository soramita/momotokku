import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
type Props = {
  title: string;
  children: JSX.Element;
  visible: boolean;
  width?: number;
  height?: number;
  onClose: () => void;
};
const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.5s;
`;
const ModalMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const ModalBox = styled.div`
  z-index: 999;
  background-color: #f3f7f8;
  padding: 10px 0;
  border-radius: 10px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ModalTitle = styled.div`
  border-bottom: 1px solid #e7ebec;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
  font-weight: 600;
  font-size: 20px;
  color: #4c5b70;
`;
const ModalContent = styled.div`
  padding: 15px;
`;
const Modal: FC<Props> = ({ title, visible, children, width = 600, height = 600, onClose }) => {
  const dom = document.body;
  return createPortal(
    <div>
      {visible ? (
        <ModalContainer>
          <ModalMask onClick={onClose} />
          <ModalBox style={{ width, height }}>
            <ModalTitle>
              {title}
              <div
                style={{ position: 'absolute', right: 10, top: 0, cursor: 'pointer' }}
                onClick={onClose}
              >
                ✕
              </div>
            </ModalTitle>
            <ModalContent>{children}</ModalContent>
          </ModalBox>
        </ModalContainer>
      ) : null}
    </div>,
    dom
  );
};
export default Modal;
