import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
const ContainerBox = styled.div`
  background: #4c5b70;
  height: 100%;
  width: 100px;
`;
const Container = () => {
  return (
    <ContainerBox>
      <div>
        <Link href={'/students'}>学生</Link>
      </div>
      <div>
        <Link href={'/studentMessage'}>消息</Link>
      </div>
    </ContainerBox>
  );
};
export default Container;