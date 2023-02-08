import Aside from '@/components/TheAside';
import Header from '@/components/TheHeader';
import { useAppDispatch } from '@/hooks/useRedux';
import { setRole } from '@/store/selectRoleReducer';
import { SessionMenu } from '@/types/menu';
import localstorageUtil from '@/utils/localstorage-util';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import style from './Layout.module.scss';
type Props = {
  children: JSX.Element;
};
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
const Layout = ({ children }: Props) => {
  const { getLocal } = localstorageUtil();
  const { getSession } = sessionStorageUtil();
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    const language = getLocal('locales');
    if (language) {
      i18n.changeLanguage(language.code);
    }
    if (getSession(SessionMenu.SELECTSTUDENT)) {
      dispatch(setRole(getSession(SessionMenu.SELECTSTUDENT)));
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
