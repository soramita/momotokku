import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Layout from '@/layout/Layout';
import 'normalize.css';
import { useRouter } from 'next/router';
import '@fontsource/m-plus-rounded-1c/800.css';
import '@fontsource/kosugi-maru';
import '@/styles/global.css';
import '@/locales/index';
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname == '/') {
      router.push('/students');
    }
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
