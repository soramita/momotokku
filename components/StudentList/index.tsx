import React, { FC, memo, useEffect, useState } from 'react';
import { StudentInfo, StudentListProps } from './type';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import { SelectStudentList } from '@/types/selectStudent';
import selectStudentMessage from '@/utils/selectStudentMessage';
import { SessionMenu } from '@/types/menu';
import { useAppDispatch } from '@/hooks/useRedux';
import { setRole } from '@/store/selectRoleReducer';
type Props = StudentListProps;
const ListContainer = styled.div`
  width: 47%;
  border-right: 2px solid #e8e8e8;
  background-color: #f3f7f8;
  overflow-y: scroll;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const List = styled.div`
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  padding: 6px 15px;
  position: relative;
`;
const Header = styled.div`
  padding: 13px 15px;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background-color: #f3f7f8;
`;
const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
`;
const RhomboidBox = styled.div`
  background-color: #fff;
  padding: 7px 0;
  transform: skew(-10deg);
  transform-origin: 0 0;
  text-align: center;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  :active {
    transition: all 0.2s;
    transform: scale(95%) skew(-10deg);
    transform-origin: 0% 50%;
  }
`;
const FilterBox = styled(RhomboidBox)`
  width: 110px;
  span {
    display: inline-block;
    transform: skew(10deg);
    font-size: 15px;
    font-weight: 600;
    color: #4c5b70;
  }
  i {
    position: absolute;
    border-right: 10px solid #4c5b70;
    border-bottom: 10px solid transparent;
    right: 5px;
    top: 5px;
  }
`;
const SortBox = styled(RhomboidBox)`
  width: 80px;
  margin-left: 10px;
  svg {
    transform: skew(10deg);
  }
`;
const SelectFilterBox = styled.div`
  position: absolute;
  top: 99%;
  left: 50px;
  width: 80%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
  z-index: 999;
  .title {
    font-weight: 600;
    font-size: 19px;
  }
  .close {
    font-weight: 600;
    font-size: 22px;
    cursor: pointer;
  }
  .content {
    width: 49%;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    padding: 10px 0;
    margin-bottom: 10px;
    color: #a7a7a7;
    font-size: 17px;
    cursor: pointer;
  }
  .ok {
    text-align: center;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.2);
    margin: 10px;
    padding: 5px 0;
    border-radius: 3px;
    font-size: 18px;
    font-weight: 600;
    color: #4c5b70;
    cursor: pointer;
  }
`;
const Name = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: black;
`;
const Introduce = styled.div`
  font-weight: 600;
  color: #666;
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
const activeStyle = {
  backgroundColor: '#f5688c',
  color: 'white',
};

const StudentList: FC<Props> = ({ title, studentList, path, filters }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { setSession, getSession } = sessionStorageUtil();
  const [active, setActive] = useState(0);
  const [deg, setDeg] = useState(0);
  const [sort, setSort] = useState(false);
  const [nowFilter, setNowFilter] = useState(filters[0].name);
  const [showFilterBox, setShowFilterBox] = useState(false);
  const [activeFilter, setActiveFilter] = useState(0);
  const handleActive = (studentInfo: StudentInfo) => {
    if (path !== 'publicChat') {
      //?????????????????????????????????
      router.replace(`${path}/${studentInfo.id}`);
      const msgInfo = selectStudentMessage(studentInfo.id);
      if (!msgInfo) {
        const selectStudentList = getSession(SessionMenu.SELECTSTUDENTLIST) as SelectStudentList;
        selectStudentList.push({ studentId: studentInfo.id, messageList: [] });
        setSession(SessionMenu.SELECTSTUDENTLIST, selectStudentList);
      }
    }
    dispatch(setRole(studentInfo));
    setActive(studentInfo.id);
    setSession(SessionMenu.SELECTSTUDENT, studentInfo);
  };
  const handleOk = (id: number) => {
    const res = filters.filter(item => item.id == id);
    setNowFilter(res[0].name);
    setShowFilterBox(false);
  };
  const handleSort = () => {
    setDeg(deg + 180);
    if (sort) {
      studentList = studentList.sort((a, b) => {
        return b.name.localeCompare(a.name, 'ja-JP');
      });
    } else {
      studentList = studentList.sort((a, b) => {
        return a.name.localeCompare(b.name, 'ja-JP');
      });
    }
    setSort(!sort);
  };
  useEffect(() => {
    setActive(Number(router.query.id));
    setActiveFilter(filters[0].id);
  }, [router.query.id]);
  return (
    <ListContainer>
      <Header>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title>
            {title}({studentList.length})
          </Title>
          <div style={{ display: 'flex' }}>
            <FilterBox onClick={() => setShowFilterBox(!showFilterBox)}>
              <span>{t(nowFilter)}</span>
              <i></i>
            </FilterBox>
            <SortBox onClick={() => handleSort()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 64" width="30">
                <rect width="68" height="12" fill="#4c5b70"></rect>
                <rect width="68" height="12" y="49" fill="#4c5b70"></rect>
                <rect width="68" height="12" y="24.5" fill="#4c5b70"></rect>
                <path
                  d="M96 0L84 12 72 24l19-1v45h10V23l18 1-12-12z"
                  style={{
                    fill: '#4c5b70',
                    transform: `translateX(10px) rotate(${deg}deg)`,
                    transformOrigin: '96px 32px',
                  }}
                ></path>
              </svg>
            </SortBox>
          </div>
        </div>
        <SelectFilterBox style={{ display: showFilterBox ? 'block' : 'none' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 15px',
              alignItems: 'center',
            }}
          >
            <span className="title">{t('????????????')}</span>
            <span className="close" onClick={() => setShowFilterBox(false)}>
              ???
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              textAlign: 'center',
              justifyContent: 'space-between',
              padding: '10px 15px 0',
              borderTop: '1px solid #e6e6e6',
              borderBottom: '1px solid #e6e6e6',
            }}
          >
            {filters.map(item => {
              return (
                <div
                  key={item.id}
                  className="content button"
                  style={activeFilter == item.id ? activeStyle : undefined}
                  onClick={() => setActiveFilter(item.id)}
                >
                  {t(item.name)}
                </div>
              );
            })}
          </div>
          <div className="ok button" onClick={() => handleOk(activeFilter)}>
            OK
          </div>
        </SelectFilterBox>
      </Header>
      <div>
        {studentList.map(item => {
          return (
            <div style={{ cursor: 'pointer' }} key={item.id} onClick={() => handleActive(item)}>
              <List style={{ backgroundColor: active == item.id ? '#dce5ec' : '#f3f7f8' }}>
                <img
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
                  <Name>{t(item.name)}</Name>
                  <Introduce>{path == '/students' ? t(item.introduce) : ''}</Introduce>
                </div>
                {path == '/students' ? (
                  <div
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '32px',
                    }}
                  >
                    <svg
                      width="67"
                      height="55"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ transform: 'scale(60%)', marginTop: '10px' }}
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
                    <KizunaRank>{item.kizunaRank}</KizunaRank>
                  </div>
                ) : null}
              </List>
            </div>
          );
        })}
      </div>
    </ListContainer>
  );
};
export default memo(StudentList);
