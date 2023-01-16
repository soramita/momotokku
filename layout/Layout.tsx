import Aside from '@/components/TheAside';
import Header from '@/components/TheHeader';
import createImgUrl from '@/utils/createImgUrl';
import localstorageUtil from '@/utils/localstorage-util';
import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { getLocal } = localstorageUtil();
  const { i18n } = useTranslation();
  useEffect(() => {
    const language = getLocal('locales');
    if (language) {
      i18n.changeLanguage(language.code);
    }
  }, []);
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
