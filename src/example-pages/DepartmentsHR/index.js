import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/DepHrPagination';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Departments"
        titleDescription=""
      />
      <ExampleWrapperSimple sectionHeading="Our Departments">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
