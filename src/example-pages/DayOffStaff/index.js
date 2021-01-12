import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/DayOffStaffHOD';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="My Requests"
        titleDescription="Send View Accept or Reject"
      />
      <ExampleWrapperSimple sectionHeading="Requests">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
