import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #888888;
  font-size: 18px;
`;
const BaseRight = () => {
  const { t } = useTranslation();
  return <Container>{t('请选择学生')}</Container>;
};
export default BaseRight;
