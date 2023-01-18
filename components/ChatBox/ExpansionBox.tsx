import React, { FC } from 'react';
import styled from 'styled-components';
import { expansionSvgList } from './config';
import { SendMessage } from './types';
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
type Props = {
  expansion: boolean;
  sendMessage: SendMessage;
};
const ExpansionBox: FC<Props> = ({ expansion, sendMessage }) => {
  //展开控制栏后的控件配置
  const controls = (type: string) => {
    if (type === 'reply') {
      sendMessage('reply');
    }
    if (type === 'plot') {
      sendMessage('plot');
    }
  };
  return (
    <ExpansionContainer style={{ height: expansion ? '200px' : '0px' }}>
      {expansionSvgList.map((item, index) => {
        return (
          <div key={index} title={item.title} onClick={() => controls(item.type)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40">
              <path d={item.d} fill={item.fill}></path>
            </svg>
          </div>
        );
      })}
    </ExpansionContainer>
  );
};
export default ExpansionBox;
