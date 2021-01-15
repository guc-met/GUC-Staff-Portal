import React, { Fragment } from 'react';
import axios from 'axios'

import { PageTitle } from '../../layout-components';
import {Button} from '@material-ui/core';

import { ExampleWrapperSimple } from '../../layout-components';

import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  FormControlLabel,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  List,
  ListItem,
  TextField,
  FormControl,
  FormLabel,
  ListItemText
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';

import DialogContentText from '@material-ui/core/DialogContentText';

import AlertDialog from '../../example-components/AlertDialog';
import { LinearProgress } from '@material-ui/core';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// import ScheduleTable from '../../example-components/ScheduleTable';
const sched = 
{ 
    'Saturday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eithar Elhinamy' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
      'Sunday': { '1st': [  { Location:'C5.208', Staff:'Eithar yom el7d' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
      'Monday': { '1st': [ { Location:'C3.102', Staff: 'N/A' },  ], '2nd': [ ], '3rd': [ { Location:'H elgmdan', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' }], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
     'Tuesday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Eslam isa' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
   'Wednesday': { '1st': [ { Location:'C3.102', Staff: 'N/A' }, { Location:'C5.208', Staff:'Balabizo gamed' }, { Location:'C3.305', Staff: 'Belal Medhat' } ], '2nd': [ { Location:'H11', Staff: 'Mervat Aboelkheir' }, { Location:'H16', Staff: 'Amr Elmougy' } ], '3rd': [ ], '4th': [ ], '5th': [ { Location:'H14', Staff: 'N/A' }, { Location:'D4.302', Staff: 'Mahmoud Gamal' }, { Location:'H13', Staff: 'Kalabala Person' }, { Location:'D4.305', Staff: 'Mahmoud Ahmed' } ] }, 
    'Thursday': { '1st':[], '2nd':[], '3rd':[], '4th':[], '5th':[] }, 
      'Friday': { '1st':[], '2nd':[], '3rd':[], '4th':[], '5th':[] }      
}

const noRad = {borderRadius:"0"};


const ScheduleSlot = function LivePreviewExample(props) {
  return (
    <Fragment>
      <td className="p-2 m-0">
          { props.slotContents.map(singleSlot => (
            <SingleSlot course={props.course} day={props.day} slot={props.slot} singleSlot={singleSlot} />
          //     <Button variant="contained" color="" className="mb-1" fullWidth style={noRad}>
          //     <span className="btn-wrapper--icon">

          //     </span>

          //     <span className="btn-wrapper--label">{slot.Location}</span>
          //     <span className="btn-wrapper--label">{' '}|{' '}</span>
          //     <span className="btn-wrapper--label">{slot.Staff}</span>
          // </Button>
          )) }
      </td>
    </Fragment>
  );
}

const ScheduleDay = function LivePreviewExample(props) {
  return (
      <Fragment>
          <ScheduleSlot course={props.course} day={props.day} slot="1st" slotContents={props.dayContents['1st']}/>
          <ScheduleSlot course={props.course} day={props.day} slot="2nd" slotContents={props.dayContents['2nd']}/>
          <ScheduleSlot course={props.course} day={props.day} slot="3rd" slotContents={props.dayContents['3rd']}/>
          <ScheduleSlot course={props.course} day={props.day} slot="4th" slotContents={props.dayContents['4th']}/>
          <ScheduleSlot course={props.course} day={props.day} slot="5th" slotContents={props.dayContents['5th']}/>
      </Fragment>

  )
}

const ScheduleTable = function LivePreviewExample(props) {
  return (
  <Fragment>
      <table className="table table-striped table-hover table-bordered mb-4">
          <colgroup>
              <col style={{width:'16.6%'}}/>
              <col style={{width:'16.6%'}}/>
              <col style={{width:'16.6%'}}/>
              <col style={{width:'16.6%'}}/>
              <col style={{width:'16.6%'}}/>
              <col style={{width:'16.6%'}}/>
          </colgroup>
              <thead className="thead-light">
                  <tr>
                      <th scope="col" style={{textAlign:"Center"}}> </th>
                      <th scope="col" style={{textAlign:"Center"}}>1<sup>st</sup></th> 
                      <th scope="col" style={{textAlign:"Center"}}>2<sup>nd</sup></th>
                      <th scope="col" style={{textAlign:"Center"}}>3<sup>rd</sup></th>
                      <th scope="col" style={{textAlign:"Center"}}>4<sup>th</sup></th>
                      <th scope="col" style={{textAlign:"Center"}}>5<sup>th</sup></th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <th scope="row" style={{textAlign:"Center"}}> Saturday</th>
                      <ScheduleDay course={props.course} day="Saturday" dayContents={sched['Saturday']} />
                  </tr>
                  <tr>
                      <th scope="row" style={{textAlign:"Center"}}> Sunday</th>
                      <ScheduleDay course={props.course} day="Sunday" dayContents={sched['Sunday']} />
                  </tr>
                  <tr>
                      <th scope="row" style={{textAlign:"Center"}}> Monday</th>
                      <ScheduleDay course={props.course} day="Monday" dayContents={sched['Monday']} />
                  </tr>
                  <tr>
                      <th scope="row" style={{textAlign:"Center"}}> Tuesday</th>
                      <ScheduleDay course={props.course} day="Tuesday" dayContents={sched['Tuesday']} />
                  </tr>
                  <tr>
                      <th scope="row" style={{textAlign:"Center"}}> Wednesday</th>
                      <ScheduleDay course={props.course} day="Wednesday" dayContents={sched['Wednesday']} />
                  </tr>
                  <tr>
                      <th scope="row" style={{textAlign:"Center"}}> Thursday</th>
                      <ScheduleDay course={props.course} day="Thursday" dayContents={sched['Thursday']} />
                  </tr>
              </tbody>
          </table>
      </Fragment>
  );
}

const UpdateLocationArea = function(props){


  return (
    <DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="location"
      label="Location"
      type=""
    />
    </DialogContentText>
  )
}

const AssignAcademicArea = function(){
  return (
    <DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="member"
        label="Staff Member ID"
        type=""
        // fullWidth
        />
    </DialogContentText>
  )
}

const SingleSlot = function (props){
  const [open1, setOpen1] = React.useState(false);

  // const [stateDelete,setStateDelete] =React.useState(false);
  const [stateUpdate,setStateUpdate] =React.useState(false);  
  const [stateAssign,setStateAssign] =React.useState(false);  
  
  // const onChangeDelete =(e)=>{
  //   setStateDelete(!stateDelete);
  //   setStateUpdate(false);
  // }
  const onDelete = (e)=>{
    //TODO: delete
  }
  const onChangeUpdate =(e)=>{
    setStateUpdate(!stateUpdate);
    // setStateDelete(false);
  }
  const onChangeAssign =(e)=>{
    setStateAssign(!stateAssign);
  }
  const handleAssign = ()=>{

  }
  const handleSlotLinkingRequest = () => {

  } 

  const handleClickOpen1 = () => {
    // console.log("hsadf");
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const color = (props.singleSlot.Staff=="N/A"?"secondary":"");

  return (
    <Fragment>
        <Button variant="contained" color={color} className="mb-1" fullWidth style={noRad}
        onClick={handleClickOpen1}>
              <span className="btn-wrapper--icon">

              </span>

              <span className="btn-wrapper--label">{props.singleSlot.Location}</span>
              <span className="btn-wrapper--label">{' '}|{' '}</span>
              <span className="btn-wrapper--label">{props.singleSlot.Staff}</span>
          </Button>
        <Dialog
          open={open1}
          onClose={handleClose1}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{props.course}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <b> {"Course: "}</b> {props.course}  </DialogContentText>
              <DialogContentText>
              <b> {"Day: "}</b> {props.day} </DialogContentText>
              <DialogContentText>
              <b> {"Slot: "}</b> {props.slot}</DialogContentText>
              <DialogContentText>
              <b> {"Location: "}</b> {props.singleSlot.Location}  </DialogContentText>
              <DialogContentText>
              <b> {"Taught by: "}</b> {props.singleSlot.Staff}  
            </DialogContentText>
            <DialogContentText>
              <Button onClick={onChangeUpdate}> Update Slot Location </Button>
              <Button onClick={onDelete}> Delete Slot  </Button>
            </DialogContentText>
            <DialogContentText>
              
            </DialogContentText>
            {stateUpdate && <UpdateLocationArea/> }
          </DialogContent>
          <DialogActions>
            <Button onClick={onChangeAssign}> Assign an academic </Button> <br></br>
            {stateAssign && <AssignAcademicArea />}
          </DialogActions>
          
          <DialogActions>
            <Button onClick={handleClose1} color="primary">
              Cancel
            </Button>
            <Button
            color= "primary"
            onClick={handleSlotLinkingRequest
            }>
               Make A Linking Request
              </Button>
          </DialogActions>
      </Dialog>

    </Fragment>
  )
}

const AddNewSlot = ()=>{
  const [dayValue, setDayValue] = React.useState('');
  const [slotValue, setSlotValue] = React.useState('');

  const handleDayChange = (event)=>{
    setDayValue(event.target.value);
  }
  const handleSlotChange = (event)=>{
    setSlotValue(event.target.value);
  }

  const handleNewSlot = ()=>{

  }

  return (
    <Fragment>
      <h3> Add a New Slot</h3>
      <div className="divider mb-3" />
      <FormControl component="fieldset">
        <FormLabel component="legend">Day</FormLabel>
        <RadioGroup row aria-label="day" name="day" onChange={handleDayChange}>
          <FormControlLabel value="Saturday" control={<Radio />} label="Saturday"  />
          <FormControlLabel value="Sunday" control={<Radio />} label="Sunday"/>
          <FormControlLabel value="Monday" control={<Radio />} label="Monday"/>
          <FormControlLabel value="Tuesday"  control={<Radio />}  label="Tuesday"/>
          <FormControlLabel value="Wednesday"  control={<Radio />}  label="Wednesday"/>
          <FormControlLabel value="Thursday"  control={<Radio />}  label="Thursday"/>
        </RadioGroup>
        <div className="divider mb-3" />
        <FormLabel component="legend">Slot</FormLabel>
        <RadioGroup row aria-label="slot" name="slot" onChange={handleSlotChange}>
          <FormControlLabel value="1st" control={<Radio />} label="1st"  />
          <FormControlLabel value="2nd" control={<Radio />} label="2nd"/>
          <FormControlLabel value="3rd" control={<Radio />} label="3rd"/>
          <FormControlLabel value="4th"  control={<Radio />}  label="4th"/>
          <FormControlLabel value="5th"  control={<Radio />}  label="5th"/>
        </RadioGroup>
        
      </FormControl>
      <FormLabel component="legend">Location</FormLabel>
      <TextField
        autoFocus
        margin="dense"
        id="newSlotLocation"
        name="newSlotLocation"
        type=""
      />
      <div className="divider mb-2" />
      <Button color="secondary" type="submit" onClick={handleNewSlot}> Submit</Button>
    </Fragment>

  )
}

export default function Schedule() {
  const course ="CSEN 2314";
  const cvr = 30;

  const [cours, courses] = React.useState();
  const cvrOp = [];
  React.useEffect(() => {
    async function fetchData() {
      const result=await axios.get(
        'http://localhost:3001/inst/viewCoverage',
        {
          headers: {
           token: localStorage.getItem('UserToken')  //to be added
          }
        }
      )
      .then(function(response) {
        if(response.status!=200){//that's an error
          return [];
        }
        else{
          // processCoverages(response);
          console.log(response);
          //return
        }
      })
      .catch(function(error){
        console.log(error);
        return [];
      })
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <PageTitle
        titleHeading="Course Schedule"
        titleDescription="Here you can see schedules of courses"
      />
      <ExampleWrapperSimple sectionHeading= {course+" Schedule"}>

        {/* <div> */}
          <label><b> Coverage:</b> </label>
        <LinearProgress variant="determinate" value={15} className="m-3" style={{height:"30px"}}/>
        {/* </div> */}
        <div className="divider mb-3" />
        <ScheduleTable course={course} sched={sched}/>
        <div className="divider mb-5" />
        <AddNewSlot />
      </ExampleWrapperSimple>
    </Fragment>
  );
}