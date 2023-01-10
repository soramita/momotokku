import type { AppProps } from 'next/app';
import React from 'react';
import 'normalize.css';
import '@fontsource/m-plus-rounded-1c/800.css';
import '@fontsource/kosugi-maru';
import '@/styles/global.css';
import Layout from '@/layout/Layout';
import '@/locales/index';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
