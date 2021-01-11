import React, { Fragment } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'

let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYWxlZC5nYW1lZEBndWMuY29tIiwiaWQiOiJhYy0xIiwibmFtZSI6ImtoYWxlZCBnYW1lZCIsInJvbGUiOiJIT0QiLCJpYXQiOjE2MTAzMDE4NDZ9.zGhbG2WJPamGpNbdPFtYFa-q2NLuD4ksVe7EePpU5Js'


const useStyles = makeStyles({
  cell: {
   // justifyContent: "center",
   // alignItems: "center",
   margin: "80px",
    width: "180px",
    height: "70px",
    fontStyle:"italic",
    fontWeight: "bold",
    "&:hover": {
      background: "#efefef"
    }
  },
})



export default function LivePreviewExample() {

  const classes=useStyles()
  let dayFunc=(s,arr,d)=>{

    let slot=arr.filter(e=>e.slot==s&&e.day==d)
    return (slot.length==0)?<td></td>:
    <td className={classes.cell}>{slot[0].location}<br></br>{slot[0].course}</td> // className={classes.cell}
  }
  


  const [scheduleEntries, setSchedule] = React.useState([])

  React.useEffect(() => {

    async function fetchData() {
    
      const result=await axios
      .get(
        'http://localhost:3001/ac/schedule',
     
        {
          headers: {
          // token: localStorage.getItem('UserToken')  //to be added
           token
          }
        }
      )
      .then(function(response) {
       // console.log(response)
       
        return response.data
      })
      .catch(function(error) {
        console.log(error);
        return [];
      })
      setSchedule(result)
    }
    fetchData();
  }, []);
  
  

  return (
    <Fragment>
   
      <div className="table-responsive">
        <table className="table table-striped  table-bordered mb-4">
          <thead className="thead-light">
            <tr>
              <th scope="col">day \ slot</th>
              <th scope="col">First</th>
              <th scope="col">Second</th>
              <th scope="col">Third</th>
              <th scope="col">Fourth</th>
              <th scope="col">Fifth</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Saturday</th>
              {dayFunc('1st',scheduleEntries,'Saturday')}
              {dayFunc('2nd',scheduleEntries,'Saturday')}
              {dayFunc('3rd',scheduleEntries,'Saturday')}
              {dayFunc('4th',scheduleEntries,'Saturday')}
              {dayFunc('5th',scheduleEntries,'Saturday')}
            </tr>
            <tr>
              <th scope="row">Sunday</th>
              {dayFunc('1st',scheduleEntries,'Sunday')}
              {dayFunc('2nd',scheduleEntries,'Sunday')}
              {dayFunc('3rd',scheduleEntries,'Sunday')}
              {dayFunc('4th',scheduleEntries,'Sunday')}
              {dayFunc('5th',scheduleEntries,'Sunday')}
            </tr>
            <tr>
              <th scope="row">Monday</th>
              {dayFunc('1st',scheduleEntries,'Monday')}
              {dayFunc('2nd',scheduleEntries,'Monday')}
              {dayFunc('3rd',scheduleEntries,'Monday')}
              {dayFunc('4th',scheduleEntries,'Monday')}
              {dayFunc('5th',scheduleEntries,'Monday')}
            </tr>
            <tr>
              <th scope="row">Tuesday</th>
              {dayFunc('1st',scheduleEntries,'Tuesday')}
              {dayFunc('2nd',scheduleEntries,'Tuesday')}
              {dayFunc('3rd',scheduleEntries,'Tuesday')}
              {dayFunc('4th',scheduleEntries,'Tuesday')}
              {dayFunc('5th',scheduleEntries,'Tuesday')}
            </tr>
            <tr>
              <th scope="row">Wednesday</th>
              {dayFunc('1st',scheduleEntries,'Wednesday')}
              {dayFunc('2nd',scheduleEntries,'Wednesday')}
              {dayFunc('3rd',scheduleEntries,'Wednesday')}
              {dayFunc('4th',scheduleEntries,'Wednesday')}
              {dayFunc('5th',scheduleEntries,'Wednesday')}
            </tr>
            <tr>
              <th scope="row">Thursday</th>
              {dayFunc('1st',scheduleEntries,'Thursday')}
              {dayFunc('2nd',scheduleEntries,'Thursday')}
              {dayFunc('3rd',scheduleEntries,'Thursday')}
              {dayFunc('4th',scheduleEntries,'Thursday')}
              {dayFunc('5th',scheduleEntries,'Thursday')}
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
