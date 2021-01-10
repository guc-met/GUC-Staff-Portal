import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import ScheduleTable from '../../example-components/ScheduleTable';
export default function Schedule() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Schedule"
        titleDescription="Here is your schedule in addition to all relevant features"
      />
      <ExampleWrapperSimple sectionHeading="Your Current Schedule">
        <ScheduleTable />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
