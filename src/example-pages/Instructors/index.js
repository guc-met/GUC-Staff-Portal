import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/InstructorsHOD';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Assign/delete/update courses to instructors"
        titleDescription=""
      />
      <ExampleWrapperSimple sectionHeading="Instructors">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
