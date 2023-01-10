import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';
import Students from '.';
const StudentsId = ({ router }: WithRouterProps) => {
  return (
    <>
      <Students>
        <div>
          <Image src={''} alt=""></Image>
        </div>
      </Students>
    </>
  );
};
export default withRouter(StudentsId);
