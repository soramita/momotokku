import React, { FC, memo, useState } from 'react';
import Image from 'next/image';
import { StudentListProps } from './type';
import styled from 'styled-components';
import Link from 'next/link';
type Props = StudentListProps;
const ListContainer = styled.div`
  width: 50%;
  border-right: 1px solid #e8e8e8;
  background-color: #f3f7f8;
`;
const List = styled.div`
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  padding: 6px 15px;
`;
const Header = styled.div`
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
`;
const Title = styled.span`
  font-weight: 600;
  font-size: 22px;
`;
const Name = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: black;
`;
const Introduce = styled.div`
  font-weight: 600;
  /* font-size: 18px; */
  color: #666;
`;
const StudentList: FC<Props> = ({ title, studentList }) => {
  const [active, setActive] = useState(0);
  const handleActive = (id: number) => {
    setActive(id);
  };
  return (
    <ListContainer>
      <Header>
        <div>
          <Title>{title}(50)</Title>
        </div>
      </Header>
      {studentList.map(item => {
        return (
          <Link href={''} key={item.id} onClick={() => handleActive(item.id)}>
            <List style={{ backgroundColor: active == item.id ? '#dce5ec' : '#f3f7f8' }}>
              <Image
                priority
                src={item.avatar}
                alt=""
                width={60}
                height={60}
                style={{ borderRadius: '50%' }}
              />
              <div
                style={{
                  marginLeft: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                <Name>{item.name}</Name>
                <Introduce>{item.introduce}</Introduce>
              </div>
            </List>
          </Link>
        );
      })}
    </ListContainer>
  );
};
export default memo(StudentList);
