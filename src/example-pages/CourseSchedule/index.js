import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import ScheduleTable from '../../example-components/ScheduleTable';
export default function Schedule() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Course Schedule"
        titleDescription="Here you can see schedules of courses"
      />
      <ExampleWrapperSimple sectionHeading= {"CSEN 1234"+" Schedule"}>
        <ScheduleTable />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
