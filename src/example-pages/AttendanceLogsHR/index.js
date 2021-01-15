import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';
import { useLocation } from 'react-router-dom';

import { ExampleWrapperSimple } from '../../layout-components';

import PaginationBasic from '../../example-components/AttendanceLogsHRPagination';
export default function Pagination() {
    const loc = useLocation();
    const id = loc.state.id;
  return (
    <Fragment>
      <PageTitle
        titleHeading="Attendance"
        titleDescription=""
      />
      <ExampleWrapperSimple sectionHeading={'Attendance of '+id}>
        <PaginationBasic />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
