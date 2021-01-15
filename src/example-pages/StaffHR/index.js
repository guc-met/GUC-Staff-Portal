import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/StaffHRPagination';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle titleHeading="Staff" titleDescription="" />
      <ExampleWrapperSimple sectionHeading="Our Staff(Scroll to te right for more data)">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
