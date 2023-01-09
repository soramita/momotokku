import StudentList from '@/components/StudentList';
import { StudentInfo } from '@/components/StudentList/type';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
const Right = styled.div`
  width: 50%;
`;
const list: Array<StudentInfo> = [
  {
    id: 1,
    name: 'name',
    avatar: '',
    school: 'school',
    introduce: '简介',
    kizunaRank: 100,
    birthday: '5月9日',
    lastSpeech: '你好',
  },
];
const StudentMessage = () => {
  const { t } = useTranslation();
  return (
    <>
      <StudentList title={t('未读消息')} filters={[]} studentList={list}></StudentList>
      <Right>123</Right>
    </>
  );
};
export default StudentMessage;
