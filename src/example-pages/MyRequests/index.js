import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/myRequestsAC';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="My Requests"
        titleDescription="Make, View, Cancel, Accept or Reject"
      />
      <ExampleWrapperSimple sectionHeading="Requests">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
