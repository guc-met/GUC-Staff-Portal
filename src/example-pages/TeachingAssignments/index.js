import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/TeachingAssignmentsHOD';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Teaching Assignments"
      />
      <ExampleWrapperSimple sectionHeading="Teaching Assignments For Staff by Course">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
