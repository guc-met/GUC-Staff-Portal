import * as React from "react";
import { useState } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import axios from 'axios'
import FilterByCourse from '../../layout-components/FilterByCourse';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function HeaderColumnsGrid() {
  const [rows, setRows] = useState([]);
  const onChange = (e) => {
    const value = e.target.value;
    setState(value);
  };

  const [state,setState]=React.useState("");
  const [boolState,setBoolState] =React.useState(false);

  const onClick1=
  async (e) => {
     e.preventDefault();
     setBoolState(true);
     let body={courseName:state}
     const response = await axios
 .post('http://localhost:3001/hod/viewStaffinDepartmentByCourse',body, {
 headers: {
  token: localStorage.getItem('UserToken')
}
})
.then(function(response) {
return response.data;
})
.catch(function(error) {
console.log(error.response.data);
return [];
});
console.log(response);
console.log(boolState);
setRows(response);
setState("");
  }
  const onClick2=
  async (e) => {
    e.preventDefault();
    const response = await axios
    .get('http://localhost:3001/hod/viewStaffinDepartment', {
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



  React.useEffect(() => {
    async function FetchData() {
        const response = await axios
          .get('http://localhost:3001/hod/viewStaffinDepartment', {
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
        <form  style={{display:'flex'}}>
        <TextField id="outlined-basic" name="course" label="Filter By Course" variant="outlined" onChange={onChange} />
        <Button variant="outlined" type="submit" hight='10' onClick={onClick1} >Filter</Button>
        <Button variant="outlined" type="submit" hight='10' onClick={onClick2} >All</Button>
        </form>
      <DataGrid
        columns={[
          { field: "id" ,
          headerName: "Id",
          disableColumnMenu:true,
          width: 100,
          },
          {
            field: "email",
            headerName: "Email",
            disableColumnMenu:true,
            width: 200,

          },
          {
            field: "name",
            headerName: "Username",
            disableColumnMenu:true,
            width: 200,
          },
          { field: "salary",
           headerName: "Salary",
           disableColumnMenu:true,
           width: 150,
           },
          { field: "gender",
           headerName: "Gender",
           disableColumnMenu:true,
           width: 100,
           },
           { field: "officeLocation",
            headerName: "Office Location",
            disableColumnMenu:true,
            width: 200,
            },
            { field: "role",
             headerName: "Role",
             disableColumnMenu:true,
             width: 150
             },
             { field: "dayOff",
              headerName: "Day Off",
              disableColumnMenu:true,
              width: 100
              },
             { field: "department",
              headerName: "Department",
              disableColumnMenu:true,
              width: 200
              }
              
          
        ]}
        rows={rows}
      />
    </div>
  );
}
