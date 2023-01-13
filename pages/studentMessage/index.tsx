import StudentList from '@/components/StudentList';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import studentInfo from '@/config/studentInfo';
import { useRouter } from 'next/router';
import BaseRight from '@/components/BaseRight';
type Props = {
  children: JSX.Element;
};
const Right = styled.div`
  width: 55%;
`;
const filterList = [
  {
    id: 1,
    name: '最新',
  },
];
const StudentMessage = ({ children }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <StudentList
        path="/studentMessage"
        title={t('未读消息')}
        filters={filterList}
        studentList={studentInfo}
      ></StudentList>
      <Right>{router.query.id ? children : <BaseRight />}</Right>
    </>
  );
};
export default StudentMessage;
