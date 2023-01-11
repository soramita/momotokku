import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '@/layout/Layout';
import 'normalize.css';
import '@fontsource/m-plus-rounded-1c/800.css';
import '@fontsource/kosugi-maru';
import '@/styles/global.css';
import '@/locales/index';
import { Provider } from 'react-redux';
import { store } from '@/store';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
