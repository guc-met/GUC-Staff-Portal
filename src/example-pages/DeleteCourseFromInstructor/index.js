import * as React from "react";
import { useState } from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


export default function BasicButtonGroup() {
  const onChangeinst = (e) => {
    const value = e.target.value;
    setStateInst(value);
  };

  const onChangecourse = (e) => {
    const value = e.target.value;
    setStateCourse(value);
  };

  const [stateInst,setStateInst]=React.useState("");
  const [stateCourse,setStateCourse]=React.useState("");

  const onClick=
  async (e) => {
     e.preventDefault();

     const res = await axios
     .delete("http://localhost:3001/hod/courseInstructor", {
       headers: {
         //'Content-Type': 'application/json',
         // token: token,  //to be added
         token: localStorage.getItem("UserToken") //to be added

         // token
         //    'auth-token': localStorage.getItem('user'),
       },
       data: {id:stateInst,courseName:stateCourse}
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
        <TextField id="inst" name="instructor" label="instructor..." variant="outlined" onChange={onChangeinst} />
        <TextField id="course" name="course" label="Course..." variant="outlined" onChange={onChangecourse} />
        <Button variant="outlined" type="submit" hight='10' onClick={onClick} >DELETE</Button>
        </form>
    </div>
  );
}