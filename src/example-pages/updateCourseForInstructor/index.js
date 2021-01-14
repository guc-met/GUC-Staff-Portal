import * as React from "react";
import { useState } from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default function BasicButtonGroup() {
  const onChangeinst1 = (e) => {
    const value = e.target.value;
    setStateInst1(value);
  };

  const onChangeinst2 = (e) => {
    const value = e.target.value;
    setStateInst2(value);
  };

  const onChangecourse = (e) => {
    const value = e.target.value;
    setStateCourse(value);
  };

  const [stateInst1,setStateInst1]=React.useState("");
  const [stateInst2,setStateInst2]=React.useState("");
  const [stateCourse,setStateCourse]=React.useState("");

  const onClick=
  async (e) => {
     e.preventDefault();
    
     const res = await axios
     .put("http://localhost:3001/hod/courseInstructor", {idOld:stateInst1,idNew:stateInst2,courseName:stateCourse} ,{
       headers: {
         //'Content-Type': 'application/json',
         // token: token,  //to be added
         token: localStorage.getItem("UserToken") //to be added

         // token
         //    'auth-token': localStorage.getItem('user'),
       },
     })
     .then(function(response) {
       //   console.log(response)
       if (response.status != 200) {
         //that's an error
         return response.data.err;
       } else {
         return response.data.msg;
         //setRows([obj,...rows]);
         //onToggleEditMode(e.id);
       }
     })
     .catch(function(error) {
       console.log(error.response.data);
       return error.response.data.err;
       //onToggleEditMode(e.id);
     });

}

  return (
    <div style={{ height: 800, width: "100%" }}>
        <form  style={{display:'flex'}}>
        <TextField id="inst1" name="instructor1" label="Old Instructor..." variant="outlined" onChange={onChangeinst1} />
        <TextField id="inst2" name="instructor2" label="Updated Instructor..." variant="outlined" onChange={onChangeinst2} />
        <TextField id="course" name="course" label="Course..." variant="outlined" onChange={onChangecourse} />
        <Button variant="outlined" type="submit" hight='10' onClick={onClick} >Update</Button>
        </form>
    </div>
  );
}