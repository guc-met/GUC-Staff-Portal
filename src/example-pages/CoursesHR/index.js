import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/CourseHrPagination';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Courses"
        titleDescription=""
      />
      <ExampleWrapperSimple sectionHeading="Our Courses">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
