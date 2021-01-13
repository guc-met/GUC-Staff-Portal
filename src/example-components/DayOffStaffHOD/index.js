import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from 'axios'



const rows = [
  {
    id: 1,
    username: "defunkt",
    age: 38
  },
  {
    id: 2,
    username: "dnkt",
    age: 30
  }
];

export default function HeaderColumnsGrid() {
  return (
    <div style={{ height: 250, width: "100%" }}>
      <DataGrid
        columns={[
          { field: "id", hide: true },
          {
            field: "username",
            headerName: "Username",
            description:
              "The identification used by the person with access to the online service."
          },
          { field: "age", headerName: "Age" }
        ]}
        rows={rows}
      />
    </div>
  );
}
