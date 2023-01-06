import React from 'react';
import styled from 'styled-components';
const ContainerBox = styled.div`
  background: red;
  height: 100vh;
  width: 450px;
`;
const Container = () => {
  console.log(1);

  return (
    <ContainerBox>
      <div>123</div>
    </ContainerBox>
  );
};
export default Container;
