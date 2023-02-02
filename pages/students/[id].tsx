import React, { useEffect, useState } from 'react';
import Students from '.';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import { SessionMenu } from '@/types/menu';
import { StudentInfo } from '@/components/StudentList/type';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 3px;
`;
const Introduce = styled.div`
  font-weight: 600;
  color: #666;
  margin-bottom: 5px;
`;
const Birthday = styled.div`
  border: 2px solid #aeb9ca;
  color: #4c5b70;
  border-radius: 10px;
  padding: 1px 6px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
`;
const KizunaRank = styled.span`
  color: #4c5b70;
  font-weight: 600;
  text-shadow: -1px 1px 0 white, 1px -1px 0 white;
  font-size: 14px;
  position: absolute;
  left: 50%;
  top: 52%;
  transform: translate(-50%, -50%);
`;

const Main = styled.div`
  border: 1px solid #c1cdd5;
  width: 380px;
  height: 400px;
  padding: 5px;
  border-radius: 5px;
  background-color: #f8fcff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;
const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid #c1cdd5;
  box-shadow: inset -1px 1px 1px rgba(0, 0, 0, 0.3);
  background-color: #fff;
`;
const MainListBox = styled.div`
  display: flex;
  border-bottom: 2px solid #d2d7db;
  padding: 8px 0;
`;
const MainLeft = styled.div`
  color: #2c4563;
  width: 20%;
`;
const MainRight = styled.div`
  color: #393a3e;
  width: 80%;
  word-wrap: break-word;
`;

const StudentsId = () => {
  const router = useRouter();
  const { getSession } = sessionStorageUtil();
  const { t } = useTranslation();
  const [studentInfo, setStudentInfo] = useState<StudentInfo>();
  useEffect(() => {
    setStudentInfo(getSession(SessionMenu.SELECTSTUDENT));
  }, [router.query]);
  return (
    <Students>
      <div style={{ padding: '15px 10px' }}>
        <Header>
          <div style={{ position: 'relative' }}>
            <img src={studentInfo?.avatar} alt="" width="114" />
            <div
              style={{
                position: 'absolute',
                right: '-10px',
                top: '50%',
                fontSize: '32px',
              }}
            >
              <svg
                width="67"
                height="55"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: 'scale(58%)', marginTop: '10px' }}
              >
                <g>
                  <path
                    stroke="#f25984"
                    strokeWidth="3"
                    d="m33.5,13.7514c13.39959,-31.30447 65.89964,0 0,40.24861c-65.89964,-40.24861 -13.39959,-71.55308 0,-40.24861z"
                    fill="#FFAFCC"
                  />
                </g>
              </svg>
              <KizunaRank>{studentInfo?.kizunaRank}</KizunaRank>
            </div>
          </div>
          <Name>{t(studentInfo?.name || '')}</Name>
          <Introduce>{t(studentInfo?.introduce || '')}</Introduce>
          <Birthday>
            <img src="/cake.svg" alt="" width={15} style={{ marginRight: '2px' }} />
            <div>{studentInfo?.birthday}</div>
          </Birthday>
        </Header>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Main>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
                return <Circle key={item}></Circle>;
              })}
            </div>
            <div style={{ padding: '10px 15px', fontSize: '18px', fontWeight: '600' }}>
              <MainListBox>
                <MainLeft>年龄</MainLeft>
                <MainRight>{`${studentInfo?.age}${t('岁')}`}</MainRight>
              </MainListBox>
              <MainListBox>
                <MainLeft>身高</MainLeft>
                <MainRight>{studentInfo?.height}cm</MainRight>
              </MainListBox>
              <MainListBox>
                <MainLeft>兴趣</MainLeft>
                <MainRight>{studentInfo?.interest}</MainRight>
              </MainListBox>
              <MainListBox>
                <MainLeft>设计</MainLeft>
                <MainRight>{studentInfo?.design}</MainRight>
              </MainListBox>
              <MainListBox>
                <MainLeft>插画</MainLeft>
                <MainRight>{studentInfo?.illustration}</MainRight>
              </MainListBox>
              <MainListBox>
                <MainLeft>CV</MainLeft>
                <MainRight>{studentInfo?.cv}</MainRight>
              </MainListBox>
            </div>
          </Main>
        </div>
      </div>
    </Students>
  );
};
export default StudentsId;
