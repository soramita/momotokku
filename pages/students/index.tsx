import StudentList from '@/components/StudentList';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import studentInfo from '@/config/studentInfo';
import { useRouter } from 'next/router';
import BaseRight from '@/components/BaseRight';
import { Filters } from '@/components/StudentList/type';
type Props = {
  children: JSX.Element;
};
const Right = styled.div`
  width: 53%;
  height: 100%;
`;
const filterList: Filters = [
  {
    id: 1,
    name: '姓名',
  },
  {
    id: 2,
    name: '学校',
  },
  {
    id: 3,
    name: '羁绊等级',
  },
];
const Students = ({ children }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <StudentList
        path="/students"
        title={t('学生')}
        filters={filterList}
        studentList={studentInfo}
      ></StudentList>
      <Right>{router.query.id ? children : <BaseRight />}</Right>
    </>
  );
};
export default Students;
