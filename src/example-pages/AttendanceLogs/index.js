import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function AttendanceLogs() {
  const [logs, setLogs] = useState([]);
  const [MissingDays, setMissingDays] = useState([]);
  const loc = useLocation();
  const isMissingDays = loc.state.isMissingDays;

  const columns = [
    { field: 'Type', headerName: 'Type', width: 130 },
    { field: 'DayName', headerName: 'Day', width: 130 },
    { field: 'Month', headerName: 'Month', width: 130 },
    { field: 'YearNo', headerName: 'Year', width: 130 },
    { field: 'Time', headerName: 'Time', width: 130 }
  ];
  const columnsMissingDays = [
    { field: 'DayName', headerName: 'Day', width: 130 },
    { field: 'Month', headerName: 'Month', width: 130 },
    { field: 'YearNo', headerName: 'Year', width: 130 }
  ];

  React.useEffect(() => {
    async function FetchData() {
      if (isMissingDays) {
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
      } else {
        const response = await axios
          .get('http://localhost:3001/staff/viewMissingDays', {
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
        setMissingDays(response);
      }
    }
    FetchData();
  }, [isMissingDays]);

  // React.useEffect(() => {
  //   async function FetchData() {
  //     const response = await axios
  //       .get('http://localhost:3001/staff/viewMissingDays', {
  //         headers: {
  //           token: localStorage.getItem('UserToken')
  //         }
  //       })
  //       .then(function(response) {
  //         return response.data;
  //       })
  //       .catch(function(error) {
  //         console.log(error.response.data);
  //         return '';
  //       });
  //     setMissingDays(response);
  //   }
  //   FetchData();
  // }, []);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={isMissingDays ? MissingDays : logs}
        columns={isMissingDays ? columnsMissingDays : columns}
        pageSize={isMissingDays ? 5 : 10}
      />
    </div>
  );
}
