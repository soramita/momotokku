import localstorageUtil from '@/utils/localstorage-util';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Modal from './Modal';
const ContainerBox = styled.div`
  background: #4c5b70;
  height: 100%;
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const LinkList = styled.div`
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: #999999;
  cursor: pointer;
`;

const linkConfig = [
  {
    id: 1,
    icon: '&#xe6a5;',
    path: '/students',
  },
  {
    id: 2,
    icon: '&#xe618;',
    path: '/studentMessage',
  },
];

const activeStyle = {
  backgroundColor: 'rgba(255,255,255,0.2)',
  color: 'white',
};
const Container = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { setLocal } = localstorageUtil();
  const [active, setActive] = useState(1);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let language = '简体中文';
    const code = e.target.value;
    if (e.target.value === 'zh-CN') {
      language = '简体中文';
    } else {
      language = '日语';
    }
    i18n.changeLanguage(code);
    setLocal('locales', {
      code,
      language,
    });
  };
  const [setting, setSetting] = useState(false);
  const closeSetting = () => {
    setSetting(false);
  };
  const changePage = (path: string) => {
    router.push(path);
  };
  useEffect(() => {
    if (router.pathname.includes('/students')) {
      setActive(1);
    } else if (router.pathname.includes('/studentMessage')) {
      setActive(2);
    } else {
      setActive(3);
    }
  }, [router.pathname]);
  return (
    <ContainerBox>
      <div>
        {linkConfig.map(item => {
          return (
            <LinkList
              key={item.id}
              className="iconfont"
              onClick={() => changePage(item.path)}
              dangerouslySetInnerHTML={{ __html: item.icon }}
              style={active === item.id ? activeStyle : {}}
            ></LinkList>
          );
        })}
      </div>
      <LinkList className="iconfont" onClick={() => setSetting(true)}>
        &#xe70f;
      </LinkList>
      {setting ? (
        <Modal title={'设置'} visible={setting} onClose={closeSetting} width={300} height={200}>
          <div>
            <span>语言：</span>
            <select
              style={{ width: '100px' }}
              defaultValue={localstorageUtil().getLocal('locales').code}
              onChange={e => handleChange(e)}
            >
              <option value="zh-CN">{t('简体中文')}</option>
              <option value="ja-JP">{t('日语')}</option>
            </select>
          </div>
        </Modal>
      ) : null}
    </ContainerBox>
  );
};
export default Container;
