import React from 'react';
import styled from 'styled-components';
const HeaderBox = styled.div`
  background: linear-gradient(#ffdc42, #ffdc42);
  height: 64px;
  border-radius: 10px 10px 0 0;
`;
const Header = () => {
  console.log(1);

  return (
    <HeaderBox>
      <div>123</div>
    </HeaderBox>
  );
};
export default Header;
