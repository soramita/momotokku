import StudentList from '@/components/StudentList';
import { StudentInfo } from '@/components/StudentList/type';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
const List = styled.div``;
const Left = styled.div`
  width: 50%;
  border-right: 1px solid #e8e8e8;
  background-color: #f3f7f8;
`;
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
  return (
    <>
      <StudentList title={'未读信息'} filters={[]} studentList={list}></StudentList>
      <Right>123</Right>
    </>
  );
};
export default StudentMessage;
