import React, { FC } from 'react';
import Image from 'next/image';
import { StudentListProps } from './type';
import styled from 'styled-components';
type Props = StudentListProps;
const ListContainer = styled.div`
  width: 50%;
  border-right: 1px solid #e8e8e8;
  background-color: #f3f7f8;
`;
const List = styled.div`
  border-bottom: 1px solid #e8e8e8;
  display: flex;
`;
const StudentList: FC<Props> = props => {
  return (
    <ListContainer>
      {props.studentList.map(item => {
        return (
          <List key={item.id}>
            <div>图片</div>
            <div>
              <div>name</div>
              <div>intro</div>
            </div>
          </List>
        );
      })}
    </ListContainer>
  );
};
export default StudentList;
