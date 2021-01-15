import React, { Fragment } from "react";

import ScheduleSlot from "../ScheduleSlot";

export default function LivePreviewExample(props) {
  return (
    <Fragment>
      <ScheduleSlot slotContents={props.day["1st"]} />
      <ScheduleSlot slotContents={props.day["2nd"]} />
      <ScheduleSlot slotContents={props.day["3rd"]} />
      <ScheduleSlot slotContents={props.day["4th"]} />
      <ScheduleSlot slotContents={props.day["5th"]} />
    </Fragment>
  );
}
