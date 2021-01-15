import * as React from "react";
import { useState } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import axios from 'axios'


export default function HeaderColumnsGrid() {
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    async function FetchData() {
        const response = await axios
          .get('http://localhost:3001/hod/viewDayOffAllStaff', {
            headers: {
              token: localStorage.getItem('UserToken')
            }
          })
          .then(function(response) {
            return response.data;
          })
          .catch(function(error) {
            console.log(error.response.data);
            return '';
          });
        setRows(response);
    }
    FetchData();
  },[]);
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        columns={[
          { field: "id" ,
          headerName: "Id",
          hideable: false,
          sortable: false,
          width: 200,
          toolbar: false 
          },
          {
            field: "name",
            headerName: "Username",
            hideable: false,
            sortable: false,
            width: 200,
            toolbar: false
          },
          { field: "dayOff",
           headerName: "Day Off",
           hideable: false,
           filterable: false,
           sortable: false,
           width: 200,
           toolbar: false,
           disableColumnMenu:true
           }
        ]}
        rows={rows}
      />
    </div>
  );
}
