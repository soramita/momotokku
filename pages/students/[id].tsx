import { WithRouterProps } from 'next/dist/client/with-router';
import { withRouter } from 'next/router';
import React from 'react';
import Students from '.';
const StudentsId = ({ router }: WithRouterProps) => {
  return (
    <>
      <Students>
        <div></div>
      </Students>
    </>
  );
};
export default withRouter(StudentsId);
