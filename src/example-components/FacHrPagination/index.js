//to be edited
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AlertDialog from '../../example-components/AlertDialog';
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
  Input
} from '@material-ui/core';

// Icons

import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import PlusIcon from "@material-ui/icons/AddOutlined";

import { makeStyles } from '@material-ui/core/styles';

import { useTheme } from '@material-ui/core/styles';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsQGdtYWlsLmNvbSIsImlkIjoiaHItMSIsIm5hbWUiOiJBYmR1bGxhaCIsImlhdCI6MTYxMDExNzU2OH0.0z56DTUtdz3iO0exClqVEzr9S0FkHkLX-cMzin1yOBU'

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

function createData(name, code) {
  return { id:code,idTemp:code,name,nameTemp:name, code,codeTemp:code,isEditMode: false };
}
 let initRow={id:"add",idTemp:"",name:"",nameTemp:"", code:"",codeTemp:"",isEditMode: true}

const useStyles = makeStyles({
  table: {
    minWidth: 500
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
});

//////
const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    //console.log('row');
    const { isEditMode } = row;
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className={classes.input}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };
  ////////
  // function Alert(props) {
  //   return <MuiAlert elevation={50} variant="filled" {...props} />;
  // }
export default  function LivePreviewExample() {
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const getFaculties=async ()=>{
    
 
  // }
  //for responsive entries
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState([false,'success','all good']);
  
  React.useEffect(() => {
    console.log(open)
    async function fetchData() {
    
      const result=await axios
      .get(
        'http://localhost:3001/hr/faculty',
     
        {
          headers: {
          // token: localStorage.getItem('UserToken')  //to be added
           token
          }
        }
      )
      .then(function(response) {
       // console.log(response)
        if(response.status!=200){//that's an error
          return [];
        }else{
          //return array
        //  console.log(response)
          let arr= response.data.map(fac=>createData(fac.name,fac.code))
          //let x=['a','b']
         // console.log(arr)
          return arr;
        }
      })
      .catch(function(error) {
        console.log(error);
        return [];
      })
      //console.log(result)

      setRows(result);
    }
    fetchData();
  }, []);
  const [previous, setPrevious] = React.useState({});
  const [dummy, setDummy] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //console.log(rows)
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  //const classes = useStyles();

  const onToggleEditMode = (id) => {
    setRows((state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };
  const onAdding = (id) => {
    //validate new faculty and add to db then send notification

   // let myToken=localStorage.getItem('UserToken') ;
   //access my payload
    let code=initRow.codeTemp;
    let name=initRow.nameTemp;
    let obj={id:code,idTemp:code,code:code,codeTemp:code,name:name,nameTemp:name,isEditMode:false};
    //console.log('hey')
    axios
      .post(
        'http://localhost:3001/hr/faculty',
        {
          name,
          code
        },
        {
          headers: {
           // 'Content-Type': 'application/json'
          // token: localStorage.getItem('UserToken')  //to be added
          token: token
            //    'auth-token': localStorage.getItem('user'),
          }
        }
      )
      .then(function(response) {
        //console.log(response)
        if(response.status!=200){//that's an error
           // setOpen({val:true,severity:"error",display:response.data.err});
            setOpen([true,"error",response.data.err]);

        }else{
          initRow.codeTemp="";
          initRow.nameTemp="";
          //setOpen({val:true,severity:"success",display:"Added successfully"});
          setOpen([true,"success",response.data.msg]);
          setRows([obj,...rows]);

        }
      })
      .catch(function(error) {
        setOpen([true,"error",error.response.data.err]);

        //console.log(error.response.data);
      });
   
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    //console.log(name);
    const newRows = rows.map((row) => {
      if (row.id === id) {
          if(name=="codeTemp"){
             //TODO 
             return { ...row, [name]: value ,["idTemp"]:value};
          }
          return { ...row, [name]: value };
      }
      return row;
    });
    if(row.id=='add'){
        initRow={...initRow,[name]:value};
    }
    //console.log(newRows);
    setRows(newRows);
  };

  const onDelete = async(e) => {
   // console.log(token)
    const res=await axios
    .delete(
      'http://localhost:3001/hr/faculty',
      {
        headers: {
          //'Content-Type': 'application/json',
         token: token,  //to be added
        // token
          //    'auth-token': localStorage.getItem('user'),
        },data:{code:e.id}
      }
      
   
    )
    .then(function(response) {
     //console.log(response)
      if(response.status!=200){//that's an error
      setOpen([true,"error",response.data.err]);
        return response.data.err
      }else{
        setOpen([true,"success",response.data.msg]);
        return response.data.msg;
        //setRows([obj,...rows]);
        //onToggleEditMode(e.id);
      }
    })
    .catch(function(error) {
      console.log(error.response.data);
      setOpen([true,"error",error.response.data.err]);
      //onToggleEditMode(e.id);
    });
    
    //console.log(rows)
    if(res&&res.charAt(0)=='D'){
      const newRows = rows.map((row, index) => {
        const indexx = rows.indexOf(row)
       // console.log(indexx)
        if (row.id == e.id) {
          //console.log(indexx)
          rows.splice(indexx, 1);
          //return previous[id] ? previous[id] : row;
        }
        return row;
      });
      //console.log(newRows)
      //setRows(newRows);
      setDummy(dummy+1)
      setPrevious((state) => {
        delete state[e.id];
        return state;
      });
    }else{
      //display error
    }
    
  };
  const onCancel = (id) => {
    const newRows = rows.map((row, index) => {
       if (row.id === id) {
           row.codeTemp=row.code;
           row.nameTemp=row.name;
           row.idTemp=row.id;
         return row;
         //return previous[id] ? previous[id] : row;
       }
      return row;
    });
    //console.log(newRows)
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };
    const onApproval = (id) => {
      let obj={};
    for(let i=0;i<rows.length;i++) {
       if (rows[i].id === id) {
           obj=rows[i];
           break
       }
    }
    console.log(obj)
   
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    axios
    .put(
      'http://localhost:3001/hr/faculty',
      {
        key:obj.id,
        name:obj.nameTemp,
        code:obj.codeTemp
      },
      {
        headers: {
         // 'Content-Type': 'application/json'
        // token: localStorage.getItem('UserToken')  //to be added
        token: token
          //    'auth-token': localStorage.getItem('user'),
        }
      }
    )
    .then(function(response) {
      //console.log(response)
      if(response.status!=200){//that's an error
        console.log(obj)
        setOpen([true,"error",response.data.err]);
        //setRows(newRows);
      //display error
        setDummy(dummy+1)

      }else{
       // onToggleEditMode(id);
       const newRows = rows.map((row, index) => {
        if (row.id === id) {
          row.id=row.idTemp;
          row.code=row.codeTemp;
          row.name=row.nameTemp;
            
          return { ...row, isEditMode: !row.isEditMode };
          //return previous[id] ? previous[id] : row;
        }
       return row;
     });
        
        //obj.
        //console.log(obj)
        setOpen([true,"success",response.data.msg]);
        setRows(newRows);
        setDummy(dummy+1)
       // setRows([obj,...rows]);
       //display success
      }
    })
    .catch(function(error) {
      setOpen([true,"error",error.response.data.err]);
      console.log(error.response.data);
    });
    //console.log(newRows)
   // onToggleEditMode(id);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
     // setOpen(true);
      return;
    }

    setOpen([false,open[1],open[2]]);
  };
  //end of responsive entries

  return (
    <>
    <Fragment>
      {/* <AlertDialog></AlertDialog> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Code</TableCell>
            <TableCell align="left">Name</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          <TableRow key="add">
                  <TableCell className={classes.selectTableCell}>
                    <IconButton
                      title="add"
                      aria-label="add"
                      onClick={() => onAdding("add")}
                    >
                      <PlusIcon />
                    </IconButton>
                     
              </TableCell>
              {/* component="th" scope="row" */}
              <CustomTableCell  {...{ row:initRow, name: "codeTemp", onChange }} />
              <CustomTableCell  {...{ row:initRow, name: "nameTemp", onChange }} />
             
              </TableRow>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.id}>
                  <TableCell className={classes.selectTableCell}>
                {row.isEditMode ? (
                  <>
                    <IconButton
                      title="confirm"
                      aria-label="confirm"
                      onClick={() => onApproval(row.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      title="cancel"
                      aria-label="cancel"
                      onClick={() => onCancel(row.id)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <div style={{display:'flex'}}>
                  <IconButton
                    title="edit"
                    aria-label="edit"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                    <AlertDialog entry='Faculty' onClick={(e)=>onDelete({...e,id:row.id})} row={row.id}> </AlertDialog>
                  </div>
                )}
              </TableCell>
              <CustomTableCell  {...{ row, name: "codeTemp", onChange }} />
              <CustomTableCell  {...{ row, name: "nameTemp", onChange }} />
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
      <Snackbar open={open[0]} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:'top', horizontal :'right'}}>
      <MuiAlert variant='filled' onClose={handleClose} severity={open[1]}>
        {open[2]}
      </MuiAlert>
    </Snackbar>
    </>
  );
}
