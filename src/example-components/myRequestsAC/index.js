import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import OpenDialog from '../../example-components/OpenDialog'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios'

import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Paper
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useTheme } from '@material-ui/core/styles';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import BasicButtonGroup from '../../example-components/BasicGroupButton';
import { AirlineSeatReclineNormalRounded } from '@material-ui/icons';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYWxlZC5nYW1lZEBndWMuY29tIiwiaWQiOiJhYy0xIiwibmFtZSI6ImtoYWxlZCBnYW1lZCIsInJvbGUiOiJIT0QiLCJpYXQiOjE2MTAzMDE4NDZ9.zGhbG2WJPamGpNbdPFtYFa-q2NLuD4ksVe7EePpU5Js'


const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  }
});

const useStyles3 = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function LivePreviewExample() {
  const classes3=useStyles3()
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [requestView,setRequestView]=React.useState('all')
  const [requestType,setRequestType]=React.useState('replacementRequests')
  const [requestsFiltered, setRequestsFiltered] = React.useState([])
  const [requests, setRequests] = React.useState([[],[],[],[],[]])

  const [requestViewRec,setRequestViewRec]=React.useState('all')
  const [requestTypeRec,setRequestTypeRec]=React.useState('replacementRequests')
  const [requestsFilteredRec, setRequestsFilteredRec] = React.useState([])

  const [dummy, setDummy] = React.useState(0);
  const [open, setOpen] = React.useState([false,'success','all good']);

  React.useEffect(() => {

    async function fetchData() {
    
      const result=await axios
      .get(
        'http://localhost:3001/ac/viewStatusOfRequests',
        
        {
          headers: {
            //'Content-Type': 'application/json',
            token: localStorage.getItem('UserToken'),  //to be added
          // token
            //    'auth-token': localStorage.getItem('user'),
          }
        }
      )
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.log(error.response);
        return [];
      })
      
      await setRequests(result)     
    }
    fetchData();
  }, []);

const reRender=()=>{
  axios
      .get(
        'http://localhost:3001/ac/viewStatusOfRequests',
        
        {
          headers: {
            //'Content-Type': 'application/json',
            token: localStorage.getItem('UserToken'),  //to be added
          // token
            //    'auth-token': localStorage.getItem('user'),
          }
        }
      )
      .then(function(response) {
        setRequests(response.data)
      })
      .catch(function(error) {
        console.log(error.response);
      }) 
}

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, requestsFiltered.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const setButtonColor=(button,type)=>{
    if(type==1){
      if(requestView==button)
        return 'inherit'
      else
        return 'secondary'
    }else{
      
      if(requestType==button)
        return 'inherit'
      else
        return 'primary'
    }
  }
  const setButtonColorRec=(button,type)=>{
    if(type==1){
      if(requestViewRec==button)
        return 'inherit'
      else
        return 'secondary'
    }else{
      
      if(requestTypeRec==button)
        return 'inherit'
      else
        return 'primary'
    }
  }
  const onClickFunc=(data,type)=>{
    let viewx=requestView
    let typex=requestType
    if(type==1){
      viewx=data
      setRequestView(data)
    }else{
      typex=data
      setRequestType(data)
    }
    let replacement=(viewx=='all')?requests[0]:requests[0].filter(e=>e.statusInst==viewx||e.statusHod==viewx)
    let leave=(viewx=='all')?requests[2]:requests[2].filter(e=>e.status==viewx)
    let changeDay=(viewx=='all')?requests[3]:requests[3].filter(e=>e.status==viewx)
    let slot=(viewx=='all')?requests[4]:requests[4].filter(e=>e.status==viewx)
    switch(typex){
      case 'replacementRequests':setRequestsFiltered(replacement);break;
      case 'leaveRequests':setRequestsFiltered(leave);break;
      case 'changeDayOffRequests':setRequestsFiltered(changeDay);break;
      case 'slotLinkingRequests':setRequestsFiltered(slot);break;
    }
  }
  const onClickFuncRec=(data,type)=>{
    let viewx=requestViewRec
    let typex=requestTypeRec
    if(type==1){
      viewx=data
      setRequestViewRec(data)
    }else{
      typex=data
      setRequestTypeRec(data)
    }
    let replacement=(viewx=='all')?requests[1]:requests[1].filter(e=>e.statusInst==viewx||e.statusHod==viewx)
    setRequestsFilteredRec(replacement)
  }
  const setSeen=(bool)=>{
    if(!bool)
      return 'bold'
      else
      return 'normal'
  }
  const onClickAccRej=(id,date,type)=>{
    axios
    .put(
      'http://localhost:3001/ac/replacementRequestAccReg',
      {
        senderId:id,
        Date:date,
        statusInst:type
      },
      {
        headers: {
          token: localStorage.getItem('UserToken'),
        }
      }
    )
    .then(function(response) {
      //console.log(response)
      if(response.status!=200)//that's an error
        setOpen([true,"error",response.data.err]);
      else{
        reRender()
        setOpen([true,"success",response.data.msg]);
      }
     })

    .catch(function(error) {
      console.log(error.response)
      setOpen([true,"error",error.response.data.err]);
    });
    setDummy(dummy+1)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
     // setOpen(true);
      return;
    }

    setOpen([false,open[1],open[2]]);
  };


  const chooseRow0=(row,type)=>{
    let seen=(type==1)?row.SeenSender:row.SeenReceiver
    switch(requestType){
      case 'slotLinkingRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Course: ',row.courseId)}</TableCell>

    }
  }
  const chooseRow1=(row,type)=>{
    let seen=(type==1)?row.SeenSender:row.SeenReceiver
    switch(requestType){
      case 'replacementRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Date: ',row.Date)}</TableCell>
      case 'leaveRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Start Date: ',row.startDate)}</TableCell>
      case 'changeDayOffRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('New Day: ',row.newday)}</TableCell>
      case 'slotLinkingRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Day: ',row.day)}</TableCell>
    }
  }
  const chooseRow2=(row,type)=>{
    let seen=(type==1)?row.SeenSender:row.SeenReceiver
    let send=(type==1)?row.receiverId:row.senderId
    switch(requestType){
      case 'replacementRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Colleague ID: ',send)}</TableCell>
      case 'leaveRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Type of Leave: ',row.typeOfLeave)}</TableCell>
      case 'slotLinkingRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Location: ',row.location)}</TableCell>
    }
  }
  const checkUndefiend=(tag,element)=>{
    if(element)
      return tag+element
    else
      return element
  }
  const sendOne=(row,type)=>{
    let send=(type==1)?row.receiverId:row.senderId
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Colleague ID: ',send)
      case 'leaveRequests':return checkUndefiend('Type of Leave: ',row.typeOfLeave)
      case 'changeDayOffRequests':return checkUndefiend('New Day: ',row.newday)
      case 'slotLinkingRequests':return checkUndefiend('Course: ',row.courseId)
    }
  }
  const sendTwo=(row)=>{
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Colleague Request Status: ',row.statusInst)
      case 'leaveRequests':return checkUndefiend('Start Date: ',row.startDate)
      case 'changeDayOffRequests':return checkUndefiend('Status: ',row.status)
      case 'slotLinkingRequests':return checkUndefiend('Status: ',row.status)
    }
  }
  const sendThree=(row)=>{
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Head of Department Status: ',row.statusHod)
      case 'leaveRequests':return checkUndefiend('Period of Leave: ',row.periodOfLeave)
      case 'changeDayOffRequests':return checkUndefiend('Reason of Change: ',row.reasonOfChange)
      case 'slotLinkingRequests':return checkUndefiend('Slot: ',row.slot)
    }
  }
  const sendFour=(row)=>{
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Reason: ',row.reason)
      case 'leaveRequests':return checkUndefiend('Document: ',row.document)
      case 'changeDayOffRequests':return checkUndefiend('Comment: ',row.comment)
      case 'slotLinkingRequests':return checkUndefiend('Day: ',row.day)
    }
  }
  const sendFive=(row)=>{
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Date: ',row.Date)
      case 'leaveRequests':return checkUndefiend('Reason: ',row.reason)
      case 'slotLinkingRequests':return checkUndefiend('Location: ',row.location)
    }
  }
  const sendSix=(row)=>{
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Slot: ',row.slot)
      case 'leaveRequests':return checkUndefiend('Compensating Day: ',row.compensatingDay)
    }
  }
  const sendSeven=(row)=>{
    switch(requestType){
      case 'leaveRequests':return checkUndefiend('Status: ',row.status)
    }
  }
  
  return (
      <>
    <Fragment><h3>Sent Requests</h3>
    <div className={classes3.root}>
      <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
        <Button color={setButtonColor('all',1)} onClick={() =>onClickFunc('all',1)}>All</Button>
        <Button color={setButtonColor('pending',1)} onClick={() =>onClickFunc('pending',1)}>Pending</Button>
        <Button color={setButtonColor('accepted',1)} onClick={() =>onClickFunc('accepted',1)}>Accepted</Button>
        <Button color={setButtonColor('rejected',1)} onClick={() =>onClickFunc('rejected',1)}>Rejected</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button color={setButtonColor('replacementRequests',2)} onClick={()=>onClickFunc('replacementRequests',2)}>Replacement</Button>
        <Button color={setButtonColor('leaveRequests',2)} onClick={()=>onClickFunc('leaveRequests',2)}>Leave</Button>
        <Button color={setButtonColor('slotLinkingRequests',2)} onClick={()=>onClickFunc('slotLinkingRequests',2)}>Slot Linking</Button>
        <Button color={setButtonColor('changeDayOffRequests',2)} onClick={()=>onClickFunc('changeDayOffRequests',2)}>Change Day Off</Button>
      </ButtonGroup>
    </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? requestsFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : requestsFiltered
            ).map((row,index) => (
              <TableRow key={index} >
              <TableCell component="th" scope="row" align="left" style={{fontWeight:setSeen(row.SeenSender)}}>
                {index+1}
              </TableCell>
              <TableCell><OpenDialog one={sendOne(row,1)} two={sendTwo(row)} three={sendThree(row)}
              four={sendFour(row)} five={sendFive(row)} six={sendSix(row)} seven={sendSeven(row)}></OpenDialog></TableCell>
              {chooseRow0(row,1)} 
              {chooseRow1(row,1)} 
              {chooseRow2(row,1)} 
              <TableCell style={{fontWeight:setSeen(row.SeenSender)}}>{checkUndefiend('slot: ',row.slot)}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={requestsFiltered.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Fragment>
    <br/>
    <br/>
    <Fragment><h3>Received Requests</h3>
    <div className={classes3.root}>
      <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
        <Button color={setButtonColorRec('all',1)} onClick={() =>onClickFuncRec('all',1)}>All</Button>
        <Button color={setButtonColorRec('pending',1)} onClick={() =>onClickFuncRec('pending',1)}>Pending</Button>
        <Button color={setButtonColorRec('accepted',1)} onClick={() =>onClickFuncRec('accepted',1)}>Accepted</Button>
        <Button color={setButtonColorRec('rejected',1)} onClick={() =>onClickFuncRec('rejected',1)}>Rejected</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button color={setButtonColorRec('replacementRequests',2)} onClick={()=>onClickFuncRec('replacementRequests',2)}>Replacement</Button>
        <Button disabled={true} color={setButtonColorRec('leaveRequests',2)} onClick={()=>onClickFuncRec('leaveRequests',2)}>Leave</Button>
        <Button disabled={true} color={setButtonColorRec('slotLinkingRequests',2)} onClick={()=>onClickFuncRec('slotLinkingRequests',2)}>Slot Linking</Button>
        <Button disabled={true} color={setButtonColorRec('changeDayOffRequests',2)} onClick={()=>onClickFuncRec('changeDayOffRequests',2)}>Change Day Off</Button>
      </ButtonGroup>
    </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? requestsFilteredRec.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : requestsFilteredRec
            ).map((row,index) => (
              <TableRow key={index} >
              <TableCell component="th" scope="row" align="left" style={{fontWeight:setSeen(row.SeenReceiver)}}>
                {index+1}
              </TableCell>
              <TableCell><OpenDialog one={sendOne(row,2)} two={sendTwo(row)} three={sendThree(row)}
              four={sendFour(row)} five={sendFive(row)} six={sendSix(row)} seven={sendSeven(row)}></OpenDialog></TableCell>
              {chooseRow0(row,2)} 
              {chooseRow1(row,2)} 
              {chooseRow2(row,2)} 
              <TableCell style={{fontWeight:setSeen(row.SeenReceiver)}}>{checkUndefiend('slot: ',row.slot)}</TableCell>
              <TableCell> <Button className="m-2 btn text-success" onClick={()=>onClickAccRej(row.senderId,row.Date,'accepted')}>Accept</Button></TableCell>
              <TableCell><Button className="m-2 btn text-danger" onClick={()=>onClickAccRej(row.senderId,row.Date,'rejected')}>Reject</Button></TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={requestsFilteredRec.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Fragment>
    <Snackbar open={open[0]} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:'bottom', horizontal :'center'}}>
      <MuiAlert variant='filled' onClose={handleClose} severity={open[1]}>
        {open[2]}
      </MuiAlert>
    </Snackbar>
    </>
  );
}
