import Aside from '@/components/TheAside';
import Header from '@/components/TheHeader';
import React from 'react';
import styled from 'styled-components';
import style from './Layout.module.css';
const Container = styled.div`
  display: flex;
`;
const Content = styled.div`
  background-color: skyblue;
  width: 1000px;
`;
const Layout = ({ children }: any) => {
  console.log(children);
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
