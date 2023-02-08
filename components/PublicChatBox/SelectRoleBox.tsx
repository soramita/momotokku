import teacherInfo from '@/config/teacherInfo';
import React, { FC, SetStateAction } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '@/hooks/useRedux';
const SelectRoleContainer = styled.div`
  background-color: #4b5a6f;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  img {
    border-radius: 50%;
    cursor: pointer;
  }
  div {
    position: relative;
  }
`;
type Props = {
  changeIsStudentRole: (e: SetStateAction<boolean>) => void;
  isStudentRole: boolean;
};
/**当前选择的角色的样式 */
const style = {
  zIndex: 999,
  top: '0',
  left: '0',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  position: 'absolute' as const,
  backgroundColor: 'rgba(0,0,0, .5)',
  cursor: 'pointer',
};
const SelectRoleBox: FC<Props> = ({ changeIsStudentRole, isStudentRole }) => {
  const studentRole = useAppSelector(state => state.selectRole.nowSelectRole);
  return (
    <SelectRoleContainer>
      <div
        style={{ position: 'relative' }}
        className="button"
        onClick={() => changeIsStudentRole(true)}
      >
        <div style={!isStudentRole ? style : {}}></div>
        <img src={studentRole?.avatar} width={44} height={44} alt="" />
      </div>
      <div
        style={{ position: 'relative' }}
        className="button"
        onClick={() => changeIsStudentRole(false)}
      >
        <div style={isStudentRole ? style : {}}></div>
        <img src={teacherInfo.avatar} width={44} height={44} alt="" />
      </div>
    </SelectRoleContainer>
  );
};
export default SelectRoleBox;
