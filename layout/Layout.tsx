import Aside from '@/components/TheAside';
import Header from '@/components/TheHeader';
import React, { memo } from 'react';
import styled from 'styled-components';
import style from './Layout.module.scss';
const Container = styled.div`
  display: flex;
  height: 100%;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
`;
const Layout = ({ children }: any) => {
  return (
    <div className={style.container}>
      <Header></Header>
      <Container>
        <Aside></Aside>
        <Content>{children}</Content>
      </Container>
    </div>
  );
};
export default Layout;
