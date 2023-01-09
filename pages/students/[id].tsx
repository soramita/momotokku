import { useRouter } from 'next/router';
import React from 'react';
import Students from '.';
import Layout from './layout';
const StudentsId = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <Layout>
        <div>123</div>
      </Layout>
    </>
  );
};
export default StudentsId;
