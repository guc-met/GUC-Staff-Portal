import * as React from "react";
import { useState } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import axios from 'axios'
import FilterByCourse from '../../layout-components/FilterByCourse';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import OpenDialog from '../../example-components/OpenDialogInstructor'

export default function SingleRowSelectionGrid() {
  const [rows, setRows] = useState([]);
  const [course,setCourse]=React.useState('')
  const onChange = (e) => {
    const value = e.target.value;
    setState(value);
  };

  const [state,setState]=React.useState("");
  const [boolState,setBoolState] =React.useState(false);
  const [viewDialog,setViewDialog]=React.useState(false)
  const [selectedMember,setSelectedMember]=React.useState('')
  const [selectedMemberName,setSelectedMemberName]=React.useState('')

  const onClick1=
  async (e) => {
     e.preventDefault();
     setBoolState(true);
     console.log(state)
     let body={courseName:state}
     setCourse(state)
     const response = await axios
 .post('http://localhost:3001/hod/viewStaffinDepartmentByCourse',body, {
 headers: {
  token: localStorage.getItem('UserToken')
}
})
.then(function(response) {
  console.log(response.data)
return response.data;
})
.catch(function(error) {
console.log(error.response.data);
return [];
});
setRows(response);

  }
  const onClick2=
  async (e) => {
    e.preventDefault();
    setBoolState(false);
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

  const onRowSelected=(row)=>{
    if(boolState){
      setViewDialog(true)
      setSelectedMember(row.data.id)
      setSelectedMemberName(row.data.name)
    }
  }

  return (
    <div style={{ height: 800, width: "100%" }}>
        <form  style={{display:'flex'}}>
        <TextField id="outlined-basic" name="course" label="Filter By Course Code" variant="outlined" onChange={onChange} />
        <Button variant="outlined" type="submit" hight='10' onClick={onClick1} >Filter</Button>
        <Button variant="outlined" type="submit" hight='10' onClick={onClick2} >All</Button>
        {(viewDialog)?<OpenDialog course={course} id={selectedMember} name={selectedMemberName}></OpenDialog>:<></>}
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
          ]
      }
        rows={rows}
        onRowSelected={(row)=>onRowSelected(row)}
      />
              
    </div>
  );
}
//onClick={()=>onClickDelete(row._id,requestType)}