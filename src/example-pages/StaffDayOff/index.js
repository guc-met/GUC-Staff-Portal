import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/StaffDayOffHOD';
export default function Pagination() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="DayOff for Staff"
      />
      <ExampleWrapperSimple sectionHeading="DaysOff">
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
