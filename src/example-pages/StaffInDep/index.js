import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/StaffInDepHOD';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Staff In This Department"
      />
      <ExampleWrapperSimple sectionHeading="Staff">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
