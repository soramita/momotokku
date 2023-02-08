import StudentList from '@/components/StudentList';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import studentInfo from '@/config/studentInfo';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import { SessionMenu } from '@/types/menu';
import PublicChatBox from '@/components/PublicChatBox';
import { useAppSelector } from '@/hooks/useRedux';
import BaseRight from '@/components/BaseRight';
const Right = styled.div`
  width: 53%;
`;
const filterList = [
  {
    id: 1,
    name: '最新',
  },
];
const PublicChat = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { getSession, setSession } = sessionStorageUtil();
  const selectRole = useAppSelector(state => state.selectRole.nowSelectRole);
  useEffect(() => {
    if (!getSession(SessionMenu.PUBLIC_MESSAGE)) {
      setSession(SessionMenu.PUBLIC_MESSAGE, []);
    }
  }, [router.pathname]);
  return (
    <>
      <StudentList
        path="publicChat"
        filters={filterList}
        title={t('学生')}
        studentList={studentInfo}
      ></StudentList>
      <Right>{selectRole.id ? <PublicChatBox /> : <BaseRight />}</Right>
    </>
  );
};
export default PublicChat;
