import React, { Fragment } from "react";

import { Button } from "@material-ui/core";

const noRad = { borderRadius: "0" };

export default function LivePreviewExample(props) {
  return (
    <Fragment>
      <td className="p-2 m-0">
        {props.slotContents.map(slot => (
          <Button
            variant="contained"
            color=""
            className="mb-1"
            fullWidth
            style={noRad}
          >
            <span className="btn-wrapper--icon"></span>

            <span className="btn-wrapper--label">{slot.Location}</span>
            <span className="btn-wrapper--label"> | </span>
            <span className="btn-wrapper--label">{slot.Staff}</span>
          </Button>
        ))}
      </td>
    </Fragment>
  );
}
