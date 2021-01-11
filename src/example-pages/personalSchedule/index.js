import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import { ExampleWrapperSimple } from '../../layout-components';

import RegularTables1Example1 from '../../example-components/personalScheduleTable';
export default function RegularTables1() {
  return (
    <Fragment>
      <PageTitle
        titleHeading="Personal Schedule"
        titleDescription=""
      />
      <ExampleWrapperSimple sectionHeading="Schedule">
        <RegularTables1Example1 />
      </ExampleWrapperSimple>
    </Fragment>
  );
}
