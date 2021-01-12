import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';

export default function AttendanceLogs() {
  const [logs, setLogs] = useState([]);
  const [MissingDays, setMissingDays] = useState([]);
  const loc = useLocation();
  const isMissingDays = loc.state.isMissingDays;
  const options = {
    filterType: 'checkbox'
  };
  const columns = [
    {
      icons: DeleteIcon,
      field: 'Type',
      hideable: false,
      filterable: false,
      headerName: 'Type',
      sortable: false,
      width: 130,
      toolbar: false
    },
    {
      field: 'DayName',
      filterable: false,
      headerName: 'Day',
      sortable: false,
      width: 130
    },
    {
      field: 'Month',
      sortable: false,
      hideable: false,
      headerName: 'Month',
      width: 130
    },
    {
      field: 'YearNo',
      filterable: false,
      headerName: 'Year',
      sortable: false,
      width: 130
    },
    {
      field: 'Time',
      filterable: false,
      headerName: 'Time',
      sortable: false,
      width: 130
    }
  ];
  const columnsMissingDays = [
    {
      field: 'DayName',
      filterable: false,
      headerName: 'Day',
      sortable: false,
      width: 130
    },
    { field: 'Month', headerName: 'Month', sortable: false, width: 130 },
    {
      field: 'YearNo',
      filterable: false,
      headerName: 'Year',
      sortable: false,
      width: 130
    }
  ];

  React.useEffect(() => {
    async function FetchData() {
      if (!isMissingDays) {
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
  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        options={options}
        rows={isMissingDays ? MissingDays : logs}
        columns={isMissingDays ? columnsMissingDays : columns}
        pageSize={isMissingDays ? 5 : 10}
      />
    </div>
  );
}
