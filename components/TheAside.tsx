import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
const ContainerBox = styled.div`
  background: #4c5b70;
  height: 100%;
  width: 100px;
`;
const Container = () => {
  const { t, i18n } = useTranslation();
  return (
    <ContainerBox>
      <div>
        <Link href={'/students'}>学生</Link>
      </div>
      <div>
        <Link href={'/studentMessage'}>消息</Link>
      </div>
      <button onClick={() => i18n.changeLanguage('ja-JP')}>jp</button>
      <button onClick={() => i18n.changeLanguage('zh-CN')}>cn</button>
    </ContainerBox>
  );
};
export default Container;
