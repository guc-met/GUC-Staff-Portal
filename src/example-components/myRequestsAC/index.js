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

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0)
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

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
  const [dummy,setDummy]=React.useState(0)

  React.useEffect(() => {

    async function fetchData() {
    
      const result=await axios
      .get(
        'http://localhost:3001/ac/viewStatusOfRequests',
        
        {
          headers: {
            //'Content-Type': 'application/json',
           token: token,  //to be added
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
      
      setRequests(result)      
    }
    fetchData();
  }, []);
  

  // console.log('1111')
  // console.log(requestView)
  // console.log(requestType)
  // console.log(requestsFiltered)


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
    console.log(requestView)
    //setDummy(dummy+1)
  }

  return (
      <Fragment>
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
    <Fragment><h3>Sent Requests</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? requestsFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : requestsFiltered
            ).map((row,index) => (
              <TableRow key={index}>
                <TableCell><OpenDialog status={row.senderId}></OpenDialog></TableCell>
                <TableCell component="th" scope="row" align="left">
                {index+1}
                </TableCell>
                <TableCell >{row.Date}</TableCell>
                <TableCell >{row.slot}</TableCell>
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
                count={rows.length}
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.name}>
                <TableCell><OpenDialog></OpenDialog></TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell >{row.calories}</TableCell>
                <TableCell >{row.fat}</TableCell>
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
                count={rows.length}
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
    </Fragment>
  );
}
