import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/FacHrPagination';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Faculties"
        titleDescription=""
      />
      <ExampleWrapperSimple sectionHeading="Our Faculties">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
