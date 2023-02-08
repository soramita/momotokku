import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import Layout from '@/layout/Layout';
import 'normalize.css';
import { useRouter } from 'next/router';
import '@fontsource/m-plus-rounded-1c/800.css';
import '@fontsource/kosugi-maru';
import '@/styles/global.css';
import '@/locales/index';
import '@/public/iconfont/iconfont.css';
import sessionStorageUtil from '@/utils/sessionStorage-util';
import localstorageUtil from '@/utils/localstorage-util';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { getSession } = sessionStorageUtil();
  const { getLocal, setLocal } = localstorageUtil();
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    if (router.pathname == '/') {
      router.push('/students');
    }
    if (getSession('imgs')) {
      setImgs(getSession('imgs'));
    }
    if (!getLocal('locales')) {
      setLocal('locales', {
        code: 'zh-CN',
        language: '简体中文',
      });
    }
  }, [router.pathname]);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div style={{ display: 'none' }}>
        {imgs.map((item, index) => {
          return <img src={item} key={index} alt="" width={0} height={0} />;
        })}
      </div>
    </Provider>
  );
}
