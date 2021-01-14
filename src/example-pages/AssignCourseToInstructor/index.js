import * as React from "react";
import { useState } from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function HeaderColumnsGrid() {

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
     let body={id:stateInst,courseName:stateCourse}
     const response = await axios
 .post('http://localhost:3001/hod/courseInstructor',body, {
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

}

  return (
    <div style={{ height: 800, width: "100%" }}>
        <form  style={{display:'flex'}}>
        <TextField id="inst" name="instructor" label="instructor..." variant="outlined" onChange={onChangeinst} />
        <TextField id="course" name="course" label="Course..." variant="outlined" onChange={onChangecourse} />
        <Button variant="outlined" type="submit" hight='10' onClick={onClick} >ASSIGN</Button>
        </form>
    </div>
  );
}
