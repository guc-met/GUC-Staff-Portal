import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/LocHRPagination';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Locations"
        titleDescription=""
      />
      <ExampleWrapperSimple sectionHeading="Our Locations">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
