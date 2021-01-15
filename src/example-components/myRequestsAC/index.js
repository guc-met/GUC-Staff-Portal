import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import OpenDialog from '../../example-components/OpenDialog'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from 'axios'

import {
  TableBody,
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Paper,
  Input,
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

import DeleteIcon from '@material-ui/icons/Delete';
import PlusIcon from "@material-ui/icons/AddOutlined";

import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYWxlZC5nYW1lZEBndWMuY29tIiwiaWQiOiJhYy0xIiwibmFtZSI6ImtoYWxlZCBnYW1lZCIsInJvbGUiOiJIT0QiLCJpYXQiOjE2MTAzMDE4NDZ9.zGhbG2WJPamGpNbdPFtYFa-q2NLuD4ksVe7EePpU5Js'


const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
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


function TablePaginationActionsRec(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, pageRec, rowsPerPageRec, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, pageRec - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, pageRec + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPageRec) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={pageRec === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={pageRec === 0}
        aria-label="previous page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={pageRec >= Math.ceil(count / rowsPerPageRec) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={pageRec >= Math.ceil(count / rowsPerPageRec) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActionsRec.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  pageRec: PropTypes.number.isRequired,
  rowsPerPageRec: PropTypes.number.isRequired
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  },
  selectEmpty: {
    marginTop: '8px',
  },
  formControl: {
    margin: '4px',
    minWidth: 120,
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
// let replaceHolder={rl:1,colleagueId:'',date:'',slot:'',reason:''}
// let leaveHolder={rl:2,typeOfLeave:'',startDate:'',periodOfLeave:'',compensatingDay:'',reason:'',document:''}

export default function LivePreviewExample() {
  const classes3=useStyles3()
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [pageRec, setPageRec] = React.useState(0);
  const [rowsPerPageRec, setRowsPerPageRec] = React.useState(5);

  const [requestView,setRequestView]=React.useState('')
  const [requestType,setRequestType]=React.useState('replacementRequests')
  const [requestsFiltered, setRequestsFiltered] = React.useState([])

  const [requests, setRequests] = React.useState([[],[],[],[],[]])

  const [requestViewRec,setRequestViewRec]=React.useState('')
  const [requestTypeRec,setRequestTypeRec]=React.useState('replacementRequests')
  const [requestsFilteredRec, setRequestsFilteredRec] = React.useState([])

  const [replacementReceived,setReplacementReceived]=React.useState([[],[]])
  const [slotReceived,setSlotReceived]=React.useState([])
  const [leaveReceived,setLeaveReceived]=React.useState([])
  const [changeDayReceived,setChangeDayReceived]=React.useState([])

  const [replaceOrLeave,setReplaceOrLeave]=React.useState('replacement')
  const [replaceHolder,setReplaceHolder]=React.useState({rl:1,colleagueId:'',date:'',slot:'',reason:''})
  const [leaveHolder,setLeaveHolder]=React.useState({rl:2,typeOfLeave:'',
  startDate:'',periodOfLeave:'',compensatingDay:'',reason:'',document:''})

  //const [dummy,setDummy]=React.useState(0)

  const [open, setOpen] = React.useState([false,'bottom','success','all good']);

  const [userRole, setUserRole] = React.useState('');


  

  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .get('http://localhost:3001/staff/getUserData', {
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
     setUserRole(response.role);
      
    }
    FetchData();
  }, []);


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
       // setRequests(response.data)
        return response.data
      })
      .catch(function(error) {
        console.log(error.response);
        return [];
      })
      
      setRequests(result)  
      getReplacement()
      
    }
    fetchData();
  }, []);

  const getReplacement=async()=>{
    await axios
        .get('http://localhost:3001/ac/replacementRequest', {
          headers: {
            token: localStorage.getItem('UserToken')
          }
        })
        .then(function(response) {
          setReplacementReceived( response.data);
        })
        .catch(function(error) {
          console.log(error.response.data);
        }) 
      onClickFuncRec('',1)
  }
  const getLeave=()=>{
    axios
          .get('http://localhost:3001/hod/viewLeaveRequests', {
            headers: {
              token: localStorage.getItem('UserToken')
            }
          })
          .then(function(response) {
            setLeaveReceived( response.data);
          })
          .catch(function(error) {
            console.log(error.response.data);
          });
  }
  const getChangeDayOff=()=>{
    axios
            .get('http://localhost:3001/hod/viewDayOffRequests', {
              headers: {
                token: localStorage.getItem('UserToken')
              }
            })
            .then(function(response) {
              setChangeDayReceived(response.data);
            })
            .catch(function(error) {
              console.log(error.response.data);
            });
  }
  const getSlot=()=>{
    axios
            .get('http://localhost:3001/cor/viewSlotRequests', {
              headers: {
                token: localStorage.getItem('UserToken')
              }
            })
            .then(function(response) {
              setSlotReceived( response.data);
            })
            .catch(function(error) {
              console.log(error.response.data);
            });
  }


const reRender=async()=>{
  await axios
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
      onClickFunc('',1)
}

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, requestsFiltered.length - page * rowsPerPage);

  const emptyRowsRec =
  rowsPerPage - Math.min(rowsPerPageRec, requestsFilteredRec.length - pageRec * rowsPerPageRec);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageRec = (event, newPage) => {
    setPageRec(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeRowsPerPageRec = event => {
    setRowsPerPageRec(parseInt(event.target.value, 10));
    setPageRec(0);
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
  const setButtonColorMake=(button)=>{
      if(replaceOrLeave==button)
        return 'inherit'
      else
        return 'primary'
  }

  const onClickFunc=(data,type)=>{
    console.log(requests)
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
    replacement.sort((a, b) => b.Date > a.Date?1:-1)
    leave.sort((a, b) => b.startDate > a.startDate?1:-1)
    changeDay.sort((a, b) => b.newday > a.newday?1:-1)
    slot.sort((a, b) => b.day > a.day?1:-1)
    switch(typex){
      case 'replacementRequests':setRequestsFiltered(replacement);break;
      case 'leaveRequests':setRequestsFiltered(leave);break;
      case 'changeDayOffRequests':setRequestsFiltered(changeDay);break;
      case 'slotLinkingRequests':setRequestsFiltered(slot);break;
    }
  }
  const onClickFuncRec=(data,type)=>{
    if(userRole=='HOD'){
      getLeave()
      getChangeDayOff()
    }
    if(userRole=='coordinator')
      getSlot() 
    let viewx=requestViewRec
    let typex=requestTypeRec
    if(type==1){
      viewx=data
      setRequestViewRec(data)
    }else{
      typex=data
      setRequestTypeRec(data)
    }
    let replacement=(viewx=='all')?replacementReceived[0]:replacementReceived[0].filter(e=>e.statusInst==viewx)
    replacement.sort((a, b) => b.Date > a.Date?1:-1)
    let hod=(viewx=='all')?replacementReceived[1]:replacementReceived[1].filter(e=>e.statusHod==viewx)
    hod.sort((a, b) => b.Date > a.Date?1:-1)
    let leave=(viewx=='all')?leaveReceived:leaveReceived.filter(e=>e.status==viewx)
    leave.sort((a, b) => b.startDate > a.startDate?1:-1)
    let changeDay=(viewx=='all')?changeDayReceived:changeDayReceived.filter(e=>e.status==viewx)
    changeDay.sort((a, b) => b.newday > a.newday?1:-1)
    let slot=(viewx=='all')?slotReceived:slotReceived.filter(e=>e.status==viewx)
    slot.sort((a, b) => b.day > a.day?1:-1)
    switch(typex){
      case 'replacementRequests':setRequestsFilteredRec(replacement);break;
      case 'replacementHod':setRequestsFilteredRec(hod);break;
      case 'leaveRequests':setRequestsFilteredRec(leave);break;
      case 'changeDayOffRequests':setRequestsFilteredRec(changeDay);break;
      case 'slotLinkingRequests':setRequestsFilteredRec(slot);break;
    }
  }

  const setSeen=(bool)=>{
    if(!bool)
      return 'bold'
      else
      return 'normal'
  }

  const onClickAccRej=(request,id,date,type)=>{
    console.log(request)
    switch(request){
      case 'replacementRequests':
        console.log(request)
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
        setOpen([true,'bottom',"error",response.data.err]);
      else{
        setOpen([true,'bottom',"success",response.data.msg]);
        //window.location.reload(false)
        getReplacement()
      }
     })

    .catch(function(error) {
      setOpen([true,'bottom',"error",error.response.data.err]);
    });break;
    case 'replacementHod':
      console.log(request)
      axios
    .put(
      'http://localhost:3001/hod/handleReplacementRequest',
      {
        requestId : id,state:type
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
        setOpen([true,'bottom',"error",response.data.err]);
      else{
        setOpen([true,'bottom',"success",response.data.msg]);
        //window.location.reload(false)
        getReplacement()
      }
     })

    .catch(function(error) {
      setOpen([true,'bottom',"error",error.response.data.err]);
    });break;
    case 'leaveRequests':
      axios
    .put(
      'http://localhost:3001/hod/handleLeaveRequests',
      {
        requestId : id,state:type
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
        setOpen([true,'bottom',"error",response.data.err]);
      else{
        setOpen([true,'bottom',"success",response.data.msg]);
        //window.location.reload(false)
        onClickFuncRec('',1)
      }
     })

    .catch(function(error) {
      setOpen([true,'bottom',"error",error.response.data.err]);
    });break;
    case 'changeDayOffRequests':
      axios
    .put(
      'http://localhost:3001/hod/handleDayOffRequests',
      {
        requestId : id,state:type
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
        setOpen([true,'bottom',"error",response.data.err]);
      else{
        setOpen([true,'bottom',"success",response.data.msg]);
        //window.location.reload(false)
        onClickFuncRec('',1)
      }
     })

    .catch(function(error) {
      setOpen([true,'bottom',"error",error.response.data.err]);
    });break;
    case 'slotLinkingRequests':
      if(type=='accepted'){
        axios
    .put(
      'http://localhost:3001/cor/acceptSlotRequest',
      {
        reqId:id
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
        setOpen([true,'bottom',"error",response.data.err]);
      else{
        setOpen([true,'bottom',"success",response.data.msg]);
        //window.location.reload(false)
        onClickFuncRec('',1)
      }
     })

    .catch(function(error) {
      setOpen([true,'bottom',"error",error.response.data.err]);
    });
      }else{
        axios
    .put(
      'http://localhost:3001/cor/rejectSlotRequest',
      {
        reqId:id
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
        setOpen([true,'bottom',"error",response.data.err]);
      else{
        setOpen([true,'bottom',"success",response.data.msg]);
        //window.location.reload(false)
        onClickFuncRec('',1)
      }
     })

    .catch(function(error) {
      setOpen([true,'bottom',"error",error.response.data.err]);
    });
      }
      break;
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen([false,open[1],open[2],open[3]]);
  };

  const onClickDelete=(id,request)=>{
    console.log(id)
    axios
    .delete(
      'http://localhost:3001/ac/cancelRequest',
      {
        headers: {
          token: localStorage.getItem('UserToken'),
        },data:{reqId:id,typeOfRequest:request}
      }
    )
    .then(function(response) {
      //console.log(response)
      if(response.status!=200)//that's an error
        setOpen([true,'top',"error",response.data.err]);
      else{
        setOpen([true,'top',"success",response.data.msg]);
        //window.location.reload(false)
        reRender()
      }
     })

    .catch(function(error) {
      console.log(error.response)
      setOpen([true,'top',"error",error.response.data.err]);
    });
  }

  const onClickSendToHod=(id,date)=>{
    axios
    .put(
      'http://localhost:3001/ac/replacementRequest',
      {
        receiverId:id,
        Date:date
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
        setOpen([true,'top',"error",response.data.err]);
      else{
        setOpen([true,'top',"success",response.data.msg]);
        //window.location.reload(false)
        reRender()
      }
     })

    .catch(function(error) {
      setOpen([true,'top',"error",error.response.data.err]);
    });
  }


  const chooseRow0=(row,type)=>{
    let seen=(type==1)?row.SeenSender:row.SeenReceiver
    if(type==1)
    switch(requestType){
      case 'slotLinkingRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Course: ',row.courseId)}</TableCell>
    }
    else
    switch(requestTypeRec){
      case 'slotLinkingRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Course: ',row.courseId)}</TableCell>
    }
  }
  const chooseRow1=(row,type)=>{
    let seen=(type==1)?row.SeenSender:row.SeenReceiver
    if(type==1)
    switch(requestType){
      case 'replacementRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Date: ',row.Date)}</TableCell>
      case 'leaveRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Start Date: ',row.startDate)}</TableCell>
      case 'changeDayOffRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('New Day: ',row.newday)}</TableCell>
      case 'slotLinkingRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Day: ',row.day)}</TableCell>
    }
    else 
    switch(requestTypeRec){
      case 'replacementRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Date: ',row.Date)}</TableCell>
      case 'replacementHod':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Date: ',row.Date)}</TableCell>
      case 'leaveRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Start Date: ',row.startDate)}</TableCell>
      case 'changeDayOffRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('New Day: ',row.newday)}</TableCell>
      case 'slotLinkingRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Day: ',row.day)}</TableCell>
    }
  }
  const chooseRow2=(row,type)=>{
    let seen=(type==1)?row.SeenSender:row.SeenReceiver
    let send=(type==1)?row.receiverId:row.senderId
    if(type==1)
    switch(requestType){
      case 'replacementRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Colleague ID: ',send)}</TableCell>
      case 'leaveRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Type of Leave: ',row.typeOfLeave)}</TableCell>
      case 'slotLinkingRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Location: ',row.location)}</TableCell>
    }
    else
    switch(requestTypeRec){
      case 'replacementRequests':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Colleague ID: ',send)}</TableCell>
      case 'replacementHod':return <TableCell style={{fontWeight:setSeen(seen)}}>{checkUndefiend('Staff Member ID: ',send)}</TableCell>
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
    if(type==1)
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Colleague ID: ',send)
      case 'leaveRequests':return checkUndefiend('Type of Leave: ',row.typeOfLeave)
      case 'changeDayOffRequests':return checkUndefiend('New Day: ',row.newday)
      case 'slotLinkingRequests':return checkUndefiend('Course: ',row.courseId)
    }
    else
    switch(requestTypeRec){
      case 'replacementRequests':return checkUndefiend('Colleague ID: ',send)
      case 'replacementHod':return checkUndefiend('Staff Member ID: ',send)
      case 'leaveRequests':return checkUndefiend('Type of Leave: ',row.typeOfLeave)
      case 'changeDayOffRequests':return checkUndefiend('New Day: ',row.newday)
      case 'slotLinkingRequests':return checkUndefiend('Course: ',row.courseId)
    }
  }
  const sendTwo=(row,type)=>{
    if(type==1)
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Colleague Request Status: ',row.statusInst)
      case 'leaveRequests':return checkUndefiend('Start Date: ',row.startDate)
      case 'changeDayOffRequests':return checkUndefiend('Status: ',row.status)
      case 'slotLinkingRequests':return checkUndefiend('Status: ',row.status)
    }
    else
    switch(requestTypeRec){
      case 'replacementRequests':return checkUndefiend('Colleague Request Status: ',row.statusInst)
      case 'replacementHod':return checkUndefiend('Colleague Request Status: ',row.statusInst)
      case 'leaveRequests':return checkUndefiend('Start Date: ',row.startDate)
      case 'changeDayOffRequests':return checkUndefiend('Status: ',row.status)
      case 'slotLinkingRequests':return checkUndefiend('Status: ',row.status)
    }
  }
  const sendThree=(row,type)=>{
    if(type==1)
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Head of Department Status: ',row.statusHod)
      case 'leaveRequests':return checkUndefiend('Period of Leave: ',row.periodOfLeave)
      case 'changeDayOffRequests':return checkUndefiend('Reason of Change: ',row.reasonOfChange)
      case 'slotLinkingRequests':return checkUndefiend('Slot: ',row.slot)
    }
    else
    switch(requestTypeRec){
      case 'replacementRequests':return checkUndefiend('Head of Department Status: ',row.statusHod)
      case 'replacementHod':return checkUndefiend('Head of Department Status: ',row.statusHod)
      case 'leaveRequests':return checkUndefiend('Period of Leave: ',row.periodOfLeave)
      case 'changeDayOffRequests':return checkUndefiend('Reason of Change: ',row.reasonOfChange)
      case 'slotLinkingRequests':return checkUndefiend('Slot: ',row.slot)
    }
  }
  const sendFour=(row,type)=>{
    if(type==1)
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Reason: ',row.reason)
      case 'leaveRequests':return checkUndefiend('Document: ',row.document)
      case 'changeDayOffRequests':return checkUndefiend('Comment: ',row.comment)
      case 'slotLinkingRequests':return checkUndefiend('Day: ',row.day)
    }
    else
    switch(requestTypeRec){
      case 'replacementRequests':return checkUndefiend('Reason: ',row.reason)
      case 'replacementHod':return checkUndefiend('Reason: ',row.reason)
      case 'leaveRequests':return checkUndefiend('Document: ',row.document)
      case 'changeDayOffRequests':return checkUndefiend('Comment: ',row.comment)
      case 'slotLinkingRequests':return checkUndefiend('Day: ',row.day)
    }
  }
  const sendFive=(row,type)=>{
    if(type==1)
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Date: ',row.Date)
      case 'leaveRequests':return checkUndefiend('Reason: ',row.reason)
      case 'slotLinkingRequests':return checkUndefiend('Location: ',row.location)
    }
    else
    switch(requestTypeRec){
      case 'replacementRequests':return checkUndefiend('Date: ',row.Date)
      case 'replacementHod':return checkUndefiend('Date: ',row.Date)
      case 'leaveRequests':return checkUndefiend('Reason: ',row.reason)
      case 'slotLinkingRequests':return checkUndefiend('Location: ',row.location)
    }
  }
  const sendSix=(row,type)=>{
    if(type==1)
    switch(requestType){
      case 'replacementRequests':return checkUndefiend('Slot: ',row.slot)
      case 'leaveRequests':return checkUndefiend('Compensating Day: ',row.compensatingDay)
    }
    else
    switch(requestTypeRec){
      case 'replacementRequests':return checkUndefiend('Slot: ',row.slot)
      case 'replacementHod':return checkUndefiend('Slot: ',row.slot)
      case 'leaveRequests':return checkUndefiend('Compensating Day: ',row.compensatingDay)
    }
  }
  const sendSeven=(row,type)=>{
    if(type==1)
    switch(requestType){
      case 'leaveRequests':return checkUndefiend('Status: ',row.status)
    }
    else
    switch(requestTypeRec){
      case 'leaveRequests':return checkUndefiend('Status: ',row.status)
    }
  }
const showAccRej=(row)=>{
  let id,date
  switch(requestTypeRec){
      case 'replacementRequests':
      if(row.statusInst=='pending'){
        id=row.senderId
        date=row.Date
      return(
        <>
        <TableCell> <Button className="m-2 btn text-success" onClick={()=>onClickAccRej(requestTypeRec,id,date,'accepted')}>Accept</Button></TableCell>
        <TableCell><Button className="m-2 btn text-danger" onClick={()=>onClickAccRej(requestTypeRec,id,date,'rejected')}>Reject</Button></TableCell>
        </>
        )
      }else{
          return <><TableCell></TableCell><TableCell></TableCell></>
        }

      case 'replacementHod':
        if(row.statusHod=='pending'){
          id=row._id
      return(
        <>
        <TableCell> <Button className="m-2 btn text-success" onClick={()=>onClickAccRej(requestTypeRec,id,0,'accepted')}>Accept</Button></TableCell>
        <TableCell><Button className="m-2 btn text-danger" onClick={()=>onClickAccRej(requestTypeRec,id,0,'rejected')}>Reject</Button></TableCell>
        </>
        )
      }else{
          return <><TableCell></TableCell><TableCell></TableCell></>
        }

      case 'leaveRequests':
      case 'changeDayOffRequests':
      case 'slotLinkingRequests':
        if(row.status=='pending'){
          id=row._id
      return(
        <>
        <TableCell> <Button className="m-2 btn text-success" onClick={()=>onClickAccRej(requestTypeRec,id,0,'accepted')}>Accept</Button></TableCell>
        <TableCell><Button className="m-2 btn text-danger" onClick={()=>onClickAccRej(requestTypeRec,id,0,'rejected')}>Reject</Button></TableCell>
        </>
        )
      }else{
          return <><TableCell></TableCell><TableCell></TableCell></>
        }
  }
}
const sendToHod=(status,id,date)=>{
  if(status=='notSent')
  return(
            <TableCell><Button className="m-2 btn text-info" variant="contained" color="inherit"
            onClick={()=>onClickSendToHod(id,date)}>Send to Head of Department</Button></TableCell>
  )
  else{
    return <TableCell></TableCell>
  }
}

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles2();
  const classes1 = useStyles1()
  return (
    <TableCell align="center" className={classes.tableCell}>
      {(name!='date'&&name!='startDate'&&name!='compensatingDay'&&name!='typeOfLeave'&&name!='slot') ? (
        <Input
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
        />
      ) :(name=='typeOfLeave')? (
      <FormControl  className={classes.formControl}>
                  <Select
                    value={row[name]}
                    name={name}
                    onChange={(e) => onChange(e, row)}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      
                    </MenuItem>
                    <MenuItem value={'Annual'}>Annual</MenuItem>
                    <MenuItem value={'Accidental'}>Accidental</MenuItem>
                    <MenuItem value={'Sick'}>Sick</MenuItem>
                    <MenuItem value={'Maternity'}>Maternity</MenuItem>
                    <MenuItem value={'Compensation'}>Compensation</MenuItem>
                  </Select>
                </FormControl>
      ):(name=='slot')?
      <FormControl  className={classes.formControl}>
                  <Select
                    value={row[name]}
                    name={name}
                    onChange={(e) => onChange(e, row)}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value="" disabled>
                      
                    </MenuItem>
                    <MenuItem value={'1st'}>1st</MenuItem>
                    <MenuItem value={'2nd'}>2nd</MenuItem>
                    <MenuItem value={'3rd'}>3rd</MenuItem>
                    <MenuItem value={'4th'}>4th</MenuItem>
                    <MenuItem value={'5th'}>5th</MenuItem>
                  </Select>
                </FormControl>
      :(
        <form className={classes1.container} noValidate>
          <TextField
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            id="date"
            label="Choose Date"
            type="date" 
            className={classes1.textField}
            InputLabelProps={{
            shrink: true,
        }}
      />
    </form>
      )}
    </TableCell>
  );
};
//setReplaceHolder(newRow)
//    setLeaveHolder(newRow)

const onChange = (e, row) => {
  const value = e.target.value;
  const name = e.target.name;
  let newRow={ ...row, [name]:value };
  let {rl}=row
  if(rl==1)
  setReplaceHolder(newRow)
  else
    setLeaveHolder(newRow)
  //setDummy(dummy+1)
};


const onClickAddReplacement=()=>{
  axios
    .post(
      'http://localhost:3001/ac/replacementRequest',
      {
        receiverId:replaceHolder.colleagueId,
        Date:replaceHolder.date,
        reason:replaceHolder.reason,
        slot:replaceHolder.slot
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
        setOpen([true,'top',"error",response.data.err]);
      else{
        setOpen([true,'top',"success",response.data.msg]);
        //window.location.reload(false)
        reRender()
      }
     })

    .catch(function(error) {
      setOpen([true,'top',"error",error.response.data.err]);
    });
}

const onClickAddLeave=()=>{
  // console.log(111)
  // console.log(leaveHolder)
  // console.log(leaveHolder.typeOfLeave)
  axios
    .post(
      'http://localhost:3001/ac/leaveRequest',
      {
        typeOfLeave:leaveHolder.typeOfLeave,
        startDate:leaveHolder.startDate,
        periodOfLeave:leaveHolder.periodOfLeave,
        document:leaveHolder.document,
        reason:leaveHolder.reason,
        compensatingDay:leaveHolder.compensatingDay
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
        setOpen([true,'top',"error",response.data.err]);
      else{
        setOpen([true,'top',"success",response.data.msg]);
        //window.location.reload(false)
        reRender()
      }
     })

    .catch(function(error) {
      setOpen([true,'top',"error",error.response.data.err]);
    });
}

const receiveButtonsEnable=()=>{
  if(userRole=='HOD')
    return (
    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button color={setButtonColorRec('replacementRequests',2)} onClick={()=>onClickFuncRec('replacementRequests',2)}>Replacement</Button>
        <Button color={setButtonColorRec('replacementHod',2)} onClick={()=>onClickFuncRec('replacementHod',2)}>Replacement as HOD</Button>
        <Button color={setButtonColorRec('leaveRequests',2)} onClick={()=>onClickFuncRec('leaveRequests',2)}>Leave</Button>
        <Button color={setButtonColorRec('changeDayOffRequests',2)} onClick={()=>onClickFuncRec('changeDayOffRequests',2)}>Change Day Off</Button>
        </ButtonGroup>
    )

    else if(userRole=='coordinator')
        return( 
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button color={setButtonColorRec('replacementRequests',2)} onClick={()=>onClickFuncRec('replacementRequests',2)}>Replacement</Button>
        <Button color={setButtonColorRec('slotLinkingRequests',2)} onClick={()=>onClickFuncRec('slotLinkingRequests',2)}>Slot Linking</Button>
        </ButtonGroup>   
        )
    else
        return( 
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button color={setButtonColorRec('replacementRequests',2)} onClick={()=>onClickFuncRec('replacementRequests',2)}>Replacement</Button>
        </ButtonGroup>
        )
}

const receivedRequestsEnable=()=>{
  if(userRole=='HR')
  return <></>
  else {
  return(
<Fragment><h3>Received Requests</h3>
    <div className={classes3.root}>
      <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
        <Button color={setButtonColorRec('all',1)} onClick={() =>onClickFuncRec('all',1)}>All</Button>
        <Button color={setButtonColorRec('pending',1)} onClick={() =>onClickFuncRec('pending',1)}>Pending</Button>
        <Button color={setButtonColorRec('accepted',1)} onClick={() =>onClickFuncRec('accepted',1)}>Accepted</Button>
        <Button color={setButtonColorRec('rejected',1)} onClick={() =>onClickFuncRec('rejected',1)}>Rejected</Button>
      </ButtonGroup>
      {receiveButtonsEnable()}
    </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPageRec > 0
              ? requestsFilteredRec.slice(pageRec * rowsPerPageRec, pageRec * rowsPerPageRec + rowsPerPageRec)
              : requestsFilteredRec
            ).map((row,index) => (
              <TableRow key={index} >
              <TableCell component="th" scope="row" align="left" style={{fontWeight:setSeen(row.SeenReceiver)}}>
                {index+1}
              </TableCell>
              <TableCell><OpenDialog one={sendOne(row,2)} two={sendTwo(row,2)} three={sendThree(row,2)}
              four={sendFour(row,2)} five={sendFive(row,2)} six={sendSix(row,2)} seven={sendSeven(row,2)}></OpenDialog></TableCell>
              {chooseRow0(row,2)} 
              {chooseRow1(row,2)} 
              {chooseRow2(row,2)} 
              <TableCell style={{fontWeight:setSeen(row.SeenReceiver)}}>{checkUndefiend('slot: ',row.slot)}</TableCell>
              {showAccRej(row)}
              </TableRow>
            ))}

            {emptyRowsRec > 0 && (
              <TableRow style={{ height: 53 * emptyRowsRec }}>
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
                rowsPerPageRec={rowsPerPageRec}
                pageRec={pageRec}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePageRec}
                onChangeRowsPerPage={handleChangeRowsPerPageRec}
                ActionsComponent={TablePaginationActionsRec}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Fragment>
  )
              }
}
 
  return (
      <>
      <Fragment>
        <h3>Make a Request</h3>
        <div className={classes3.root}>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button color={setButtonColorMake('replacement')} onClick={()=>setReplaceOrLeave('replacement')}>Replacement Request</Button>
        <Button color={setButtonColorMake('leave')} onClick={()=>setReplaceOrLeave('leave')}>Leave Request</Button>
        </ButtonGroup>
        </div>
        {
  (replaceOrLeave=='replacement')?
      <Table className={classes.table}>
      <TableHead >
        <TableRow >
          <TableCell align="center" />
          <TableCell align="center">Colleague ID</TableCell>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Slot</TableCell>
          <TableCell align="center">Reason</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key="add">
                <TableCell className={classes.selectTableCell}>
                  <IconButton
                    title="add"
                    aria-label="add"
                    onClick={() => onClickAddReplacement()}
                  >
                    <PlusIcon />
                  </IconButton>
                   
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
            <Input
          value={replaceHolder['colleagueId']}
          name={'colleagueId'}
          onChange={(e) => onChange(e, replaceHolder)}
          className={classes.input}
        />
        </TableCell>
              <CustomTableCell  {...{ row:replaceHolder, name: "date", onChange }} />
              <CustomTableCell  {...{ row:replaceHolder, name: "slot", onChange }} />
              <TableCell align="center" className={classes.tableCell}>
              <Input
                value={replaceHolder['reason']}
                name={'reason'}
                onChange={(e) => onChange(e, replaceHolder)}
                className={classes.input}
              />
              </TableCell>
            </TableRow>
      </TableBody>
      </Table>

  :

      <Table className={classes.table}>
      <TableHead >
        <TableRow >
          <TableCell align="center" />
          <TableCell align="center">Type Of Leave</TableCell>
          <TableCell align="center">Start Date</TableCell>
          <TableCell align="center">Period Of Leave</TableCell>
          <TableCell align="center">Compensating Day <h6 style={{color:'skyblue'}}>Only for Compensation Leaves</h6></TableCell>
          <TableCell align="center">Reason</TableCell>
          <TableCell align="center">Document <h6 style={{color:'skyblue'}}>Put Google Drive link</h6></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow key="add">
                <TableCell className={classes.selectTableCell}>
                  <IconButton
                    title="add"
                    aria-label="add"
                    onClick={() => onClickAddLeave()}
                  >
                    <PlusIcon />
                  </IconButton>
                   
            </TableCell>
              <CustomTableCell  {...{ row:leaveHolder, name: "typeOfLeave", onChange }} />
              <CustomTableCell  {...{ row:leaveHolder, name: "startDate", onChange }} />
              <TableCell align="center" className={classes.tableCell}>
              <Input
                value={leaveHolder['periodOfLeave']}
                name={'periodOfLeave'}
                onChange={(e) => onChange(e, leaveHolder)}
                className={classes.input}
              />
              </TableCell>
              <CustomTableCell  {...{ row:leaveHolder, name: "compensatingDay", onChange }} />
              <TableCell align="center" className={classes.tableCell}>
              <Input
                value={leaveHolder['reason']}
                name={'reason'}
                onChange={(e) => onChange(e, leaveHolder)}
                className={classes.input}
              />
              </TableCell>
              <TableCell align="center" className={classes.tableCell}>
              <Input
                value={leaveHolder['document']}
                name={'document'}
                onChange={(e) => onChange(e, leaveHolder)}
                className={classes.input}
              />
              </TableCell>
            </TableRow>
      </TableBody>
      </Table>
  
}
      </Fragment>
      <br/><br/>
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
              <TableCell><OpenDialog one={sendOne(row,1)} two={sendTwo(row,1)} three={sendThree(row,1)}
              four={sendFour(row,1)} five={sendFive(row,1)} six={sendSix(row,1)} seven={sendSeven(row,1)}></OpenDialog></TableCell>
              {chooseRow0(row,1)} 
              {chooseRow1(row,1)} 
              {chooseRow2(row,1)} 
              <TableCell style={{fontWeight:setSeen(row.SeenSender)}}>{checkUndefiend('slot: ',row.slot)}</TableCell>
              {sendToHod(row.statusHod,row.receiverId,row.Date)}
              <TableCell><IconButton aria-label="delete" onClick={()=>onClickDelete(row._id,requestType)}>
                          <DeleteIcon />
                        </IconButton>
              </TableCell>
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
    {receivedRequestsEnable()}
    <Snackbar open={open[0]} onClose={handleClose} anchorOrigin={{ vertical:open[1], horizontal :'center'}}>
      <MuiAlert variant='filled' onClose={handleClose} severity={open[2]}>
        {open[3]}
      </MuiAlert>
    </Snackbar>
    </>
  );
}
