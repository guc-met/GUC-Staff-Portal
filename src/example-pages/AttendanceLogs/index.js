import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';

export default function AttendanceLogs() {
  const [logs, setLogs] = useState([]);

  const columns = [
    { field: 'Type', headerName: 'Type', width: 130 },
    { field: 'DayName', headerName: 'Day', width: 130 },
    { field: 'Month', headerName: 'Month', width: 130 },
    {
      field: 'YearNo',
      headerName: 'Year',
      width: 130
    },
    {
      field: 'Time',
      headerName: 'Time',
      width: 130
    }
  ];
  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .get('http://localhost:3001/staff/viewAttendance', {
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
      setLogs(response);
    }
    FetchData();
  }, []);
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid rows={logs} columns={columns} pageSize={10} />
    </div>
  );
}
