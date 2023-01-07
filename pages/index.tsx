import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname == '/') {
      router.push('/students');
    }
  });
  return <></>;
};
export default Home;
