import React from 'react';
import styled from 'styled-components';
const HeaderBox = styled.div`
  background: linear-gradient(to right, #f7b5c6, #f591aa);
  height: 64px;
  border-radius: 10px 10px 0 0;
`;
const Title = styled.div`
  color: white;
  font-weight: 700;
  font-size: 32px;
  line-height: 64px;
  margin-left: 40px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;
const Header = () => {
  return (
    <HeaderBox>
      <Title>MomoTalk</Title>
    </HeaderBox>
  );
};
export default Header;
