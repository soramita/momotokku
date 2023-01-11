import localstorageUtil from '@/utils/localstorage-util';
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
  const { setLocal } = localstorageUtil();
  const handleChange = (code: string, language: string) => {
    i18n.changeLanguage(code);
    setLocal('locales', {
      code,
      language,
    });
  };
  return (
    <ContainerBox>
      <div>
        <Link href={'/students'}>学生</Link>
      </div>
      <div>
        <Link href={'/studentMessage'}>消息</Link>
      </div>
      <button onClick={() => handleChange('ja-JP', '日本語')}>jp</button>
      <button onClick={() => handleChange('zh-CN', '简体中文')}>cn</button>
    </ContainerBox>
  );
};
export default Container;
