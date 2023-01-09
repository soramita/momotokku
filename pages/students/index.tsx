import StudentList from '@/components/StudentList';
import { StudentInfo } from '@/components/StudentList/type';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { IResponse } from '../api/type';
import Layout from './layout';
type Props = {
  studentInfo: IResponse<Array<StudentInfo>>;
};
const Right = styled.div`
  width: 50%;
`;
const Students = ({ studentInfo }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <>
      <StudentList title={t('学生')} filters={[]} studentList={studentInfo.data}></StudentList>
      <button onClick={() => router.push('/students/1')}>123</button>
      <Layout>
        <Right></Right>
      </Layout>
    </>
  );
};
Students.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/student');
  const studentInfo = await res.json();
  return {
    studentInfo: studentInfo,
  };
};
export default Students;
