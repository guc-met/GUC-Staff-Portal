import React, { Fragment } from "react";
import { useHistory } from 'react-router-dom';

import PropTypes from "prop-types";
import DropdownsBasic from "../../example-components/Dropdowns/DropdownsBasic";
import AlertDialog from "../../example-components/AlertDialog";
import axios from "axios";
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
} from "@material-ui/core";

// Icons

import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CancelIcon from "@material-ui/icons/CancelOutlined";
import PlusIcon from "@material-ui/icons/AddOutlined";

import { makeStyles } from "@material-ui/core/styles";

import { useTheme } from "@material-ui/core/styles";

import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Button } from '@material-ui/core';

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ExampleWrapperSimple } from "../../layout-components";
//let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsQGdtYWlsLmNvbSIsImlkIjoiaHItMSIsIm5hbWUiOiJBYmR1bGxhaCIsImlhdCI6MTYxMDExNzU2OH0.0z56DTUtdz3iO0exClqVEzr9S0FkHkLX-cMzin1yOBU'
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
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

function createData(
  id,
  email,
  name,
  salary,
  gender,
  officeLocation,
  role,
  signInLogs,
  dayOff,
  department
) {
  return {
    id,
    email,
    name,
    salary,
    salaryTemp: salary,
    gender,
    officeLocation,
    officeLocationTemp: officeLocation,
    role,
    roleTemp: role,
    signInLogs,
    dayOff,
    department,
    departmentTemp: department,
    // headId,headIdTemp:headId,
    isEditMode: false
  };
}
// "email" : "foo@guc.edu.eg","name" : "timo",
// "salary" : 10000000000,"gender" : "male","officeLocation" : "C3.320","role": "TA","dayOff" :"Tuesday","department" :  "MET"
let initRow = {
  id: "",
  email: "",
  name: "",
  salary: "",
  gender: "",
  officeLocation: "",
  dayOff: "",
  role: "",
  department: "",
  isEditMode: true
};

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
  },
  formControl: {
    margin: "4px",
    minWidth: 120
  },
  selectEmpty: {
    marginTop: "8px"
  }
});

//////
const CustomTableCell = ({ row, name, onChange, deps,locs }) => {
  const classes = useStyles();
  const { isEditMode } = row;
 // console.log(row);
  return (
    <TableCell align="left" className={classes.tableCell}>
      {name === "gender" && row.id === "" ? (
        <>
          <FormControl className={classes.formControl}>
            <Select
              value={row.depTemp}
              name={name}
              // onChange={handleChange}
              onChange={e => onChange(e, row)}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={row[name]} disabled></MenuItem>
              {/* {row.deps.map(dep => ( */}
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              {/* ))} */}
            </Select>
          </FormControl>
        </>
      ) : name === "roleTemp"  &&isEditMode? ( //TODO }
        <FormControl className={classes.formControl}>
          <Select
            value={row.depTemp}
            name={name}
            // onChange={handleChange}
            onChange={e => onChange(e, row)}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={row[name]} disabled></MenuItem>
            {/* {row.deps.map(dep => ( */}
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="HOD">HOD</MenuItem>
            <MenuItem value="instructor">instructor</MenuItem>
            <MenuItem value="TA">TA</MenuItem>
            {/* ))} */}
          </Select>
        </FormControl>
      ) : 
      name === "departmentTemp" &&isEditMode ? (
        <FormControl className={classes.formControl}>
          <Select
            value={row.depTemp}
            name={name}
            // onChange={handleChange}
            onChange={e => onChange(e, row)}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value='None'>None</MenuItem>
            <MenuItem value={row[name]} disabled></MenuItem>
            {deps.map(dep => (
              <MenuItem value={dep}>{dep}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : 
      name === "officeLocationTemp"&&isEditMode ? (
        <FormControl className={classes.formControl}>
          <Select
            value={row.depTemp}
            name={name}
            // onChange={handleChange}
            onChange={e => onChange(e, row)}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={row[name]} disabled></MenuItem>
            {locs.map(loc => (
              <MenuItem value={loc}>{loc}</MenuItem>
            ))}
          </Select>
        </FormControl>
      ):isEditMode&&(name=='salaryTemp'||(name=='name'&&row.id=='')||(name=='email'&&row.id=='')||(name=='dayOff'&&row.id==''))?(
        <Input
        value={row[name]}
        name={name}
        onChange={e => onChange(e, row)}
        className={classes.input}
      />
      )
      :(
        row[name]
      )}
    </TableCell>
  );
};
////////

export default function LivePreviewExample() {
  const classes = useStyles();
  const history = useHistory();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //for responsive entries
  const [role, setRole] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [locs, setLocs] = React.useState([]);
  const [deps, setDeps] = React.useState([]);
  const [open, setOpen] = React.useState([false, "success", "all good"]);

  React.useEffect(() => {
    //console.log(open)
    async function fetchData() {
      const result = await axios
        .get(
          "http://localhost:3001/hr/member",

          {
            headers: {
              token: localStorage.getItem("UserToken") //to be added
              // token
            }
          }
        )
        .then(function(response) {
          // console.log(response)
          if (response.status != 200) {
            //that's an error
            return [];
          } else {
            //return array
            // console.log(response.data)
            let arr = response.data.map(staff => {
              //console.log(dep)
 
              return createData(
                staff.id,
                staff.email,
                staff.name,
                staff.salary,
                staff.gender,
                staff.officeLocation,
                staff.role,
                staff.signInLogs,
                staff.dayOff,
                staff.department
              );
            });
            //let x=['a','b']
           // console.log(arr);
            arr.sort((a, b) =>
              a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1
            );
            return arr;
          }
        })
        .catch(function(error) {
          console.log(error);
          return [];
        });
      //console.log(result)

      //retrieve facs to show them
      const udata = await axios
        .get(
          "http://localhost:3001/staff/getUserData",

          {
            headers: {
              token: localStorage.getItem("UserToken") //to be added
              // token
            }
          }
        )
        .then(function(response) {
          // console.log(response)
          if (response.status != 200) {
            //that's an error
            return {};
          } else {
            return response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
          return {};
        });
      setRole(udata.role);
      if(udata.role=='HR'){
        const dps = await axios
        .get(
          "http://localhost:3001/hr/department",

          {
            headers: {
              token: localStorage.getItem("UserToken") //to be added
              // token
            }
          }
        )
        .then(function(response) {
         //  console.log(response.data)
          if (response.status != 200) {
            //that's an error
            return [];
          } else {
            let arr=response.data.map(res=>res._doc.code);
            return arr;
          }
        })
        .catch(function(error) {
          console.log(error);
          return {};
        });
        setDeps(dps)
        const lc = await axios
        .get(
          "http://localhost:3001/hr/location",

          {
            headers: {
              token: localStorage.getItem("UserToken") //to be added
              // token
            }
          }
        )
        .then(function(response) {
           //console.log(response.data)
          if (response.status != 200) {
            //that's an error
            return [];
          } else {
            let arr=response.data.filter(a=>a.type==='Office')
             arr=arr.map(res=>res.name);
           

            return arr;
          }
        })
        .catch(function(error) {
          console.log(error);
          return {};
        });
        setLocs(lc)
      }
      console.log(udata)
      setRows(result);
    }
    fetchData();
  }, []);
  // console.log(rows)
  const [previous, setPrevious] = React.useState({});
  const [dummy, setDummy] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  //const classes = useStyles();

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };
  const onAdding =async id => {
    // });
    let name = initRow.name;
    let email = initRow.email;
    let department = initRow.departmentTemp;
    let role = initRow.roleTemp;
    let dayOff = initRow.dayOff;
    let salary = initRow.salaryTemp;
    let gender = initRow.gender;
    let officeLocation = initRow.officeLocationTemp;



    //let headOfDepartmentId=initRow.headIdTemp
    //let first=true;
    // for(let i=0;i<rows.length;i++){
    //   if(rows[i].codeTemp===code){
    //     dep=rows[i].mainDepartment;
    //     break;
    //   }
    // }
    // let obj={id:code,idTemp:code,code,codeTemp:code,name,nameTemp:name,
    //   mainDepartment:dep,mainDepartmentTemp:dep,
    //   isEditMode:false};
    let body = { name, email, department,role,dayOff,gender,salary,officeLocation };

   // console.log(body);
    axios
      .post("http://localhost:3001/hr/member", body, {
        headers: {
          // 'Content-Type': 'application/json'
          token: localStorage.getItem("UserToken") //to be added
          //token: token
          //    'auth-token': localStorage.getItem('user'),
        }
      })
      .then(function(response) {
        //console.log(response)
        if (response.status != 200) {
          //that's an error
          // setOpen({val:true,severity:"error",display:response.data.err});
          setOpen([true, "error", response.data.err]);
        } else {
          //  initRow.codeTemp="";
          initRow.name='';
          initRow.email='';
          initRow.departmentTemp='';
          initRow.roleTemp='';
          initRow.dayOff='';
          initRow.salaryTemp='';
          initRow.gender='';
          initRow.officeLocationTemp='';
          // setLocType(''); //TODOOOOO
          //setOpen({val:true,severity:"success",display:"Added successfully"});
         // window.location.reload(false);
          setOpen([true, "success", response.data.msg]);
          //setRows([...rows,obj]);
        }
      })
      .catch(function(error) {
        setOpen([true, "error", error.response.data.err]);

        console.log(error.response.data);
      });
      document.location.href=window.location.origin+'/StaffHR'

    //setRows([...rows]);
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    let value = e.target.value;
    //console.log(value);
    const name = e.target.name;
    if(name=='departmentTemp'&&value=='None'){
      value='';
    }
    const { id } = row;
    //console.log(name);
    const newRows = rows.map(row => {
      if (row.id === id) {
        if (name === "codeTemp") {
          //TODO:
          return { ...row, [name]: value, ["idTemp"]: value };
        }
        return { ...row, [name]: value };
      }
      return row;
    });
    if (row.id === "") {
      //RECHECKK TODO HOBA LALAA
      initRow = { ...initRow, [name]: value };
      // console.log(name)
     // if (name === "typeTemp") {
        //  setLocType(value);
     // }
    }
    // console.log(initRow);
    setRows(newRows);
  };

  const onDelete = async e => {
  //   console.log(e.id)
    const res = await axios
      .delete("http://localhost:3001/hr/member", {
        headers: {
          //'Content-Type': 'application/json',
          // token: token,  //to be added
          token: localStorage.getItem("UserToken") //to be added

          // token
          //    'auth-token': localStorage.getItem('user'),
        },
        data: { id: e.id }
      })
      .then(function(response) {
        if (response.status != 200) {
          //that's an error
          setOpen([true, "error", response.data.err]);
          return response.data.err;
        } else {
          setOpen([true, "success", response.data.msg]);
          return response.data.msg;
          //setRows([obj,...rows]);
          //onToggleEditMode(e.id);
        }
      })
      .catch(function(error) {
        console.log(error.response.data);
        setOpen([true, "error", error.response.data.err]);
        return error.response.data.err;
        //onToggleEditMode(e.id);
      });

    // console.log(res)
    if (res && res.charAt(0) === "D") {
      let idx=0;
      // const newRows = rows.map((row, index) => {
      //   const indexx = rows.indexOf(row)
      //  // console.log(indexx)
      //   if (row.id === e.id) {
      //     //console.log(indexx)
          
      //     //return previous[id] ? previous[id] : row;
      //   }
      //   return row;
     // });
      for(let i=0;i<rows.length;i++){
        if(rows[i].id===e.id){
          idx=i;
          break;
        }
      }
      rows.splice(idx, 1);;
//console.log()
      setRows([...rows]);
      setDummy(dummy + 1);
      setPrevious(state => {
        delete state[e.id];
        return state;
      });
      // window.location.reload(false);
    } else {
      //display error
      setOpen([true, "error", res ? res : "Something wrong happened"]);
    }
  };
  const onCancel = id => {
    const newRows = rows.map((row, index) => {
      if (row.id === id) {
        row.roleTemp = row.role;
        //row.curCapacityTemp=row.curCapacity;
        //row.typeTemp=row.type;
        row.departmentTemp = row.department;
        row.officeLocationTemp = row.officeLocation;
        //  row.depTemp=row.dep;
        //  row.facultyCodeTemp=row.facultyCode;
        row.salaryTemp = row.salary;
        return row;
        //return previous[id] ? previous[id] : row;
      }
      return row;
    });
    //console.log(newRows);
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
    /////////////////////////////////
  };
  const onApproval = id => {
    //////////////////
    let obj = {};
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        obj = rows[i];
        break;
      }
    }
     console.log(obj)

    setPrevious(state => {
      delete state[id];
      return state;
    });
    axios
      .put(
        "http://localhost:3001/hr/member",
        {
          id: obj.id,
          department: obj.departmentTemp,
          salary: obj.salaryTemp,
          officeLocation: obj.officeLocationTemp,
          role: obj.roleTemp
        },
        {
          headers: {
            // 'Content-Type': 'application/json'
            token: localStorage.getItem("UserToken") //to be added
            //token: token
            //    'auth-token': localStorage.getItem('user'),
          }
        }
      )
      .then(function(response) {
        //console.log(response)
        if (response.status != 200) {
          //that's an error
         // console.log(obj);
          setOpen([true, "error", response.data.err]);
          //setRows(newRows);
          //display error
          setDummy(dummy + 1);
        } else {
          // onToggleEditMode(id);
          const newRows = rows.map((row, index) => {
            if (row.id === id) {
             // row.id = row.idTemp;
              row.role = row.roleTemp;
              row.officeLocation = row.officeLocationTemp;
              row.department = row.departmentTemp;
              row.salary = row.salaryTemp;

              return { ...row, isEditMode: !row.isEditMode };
              //return previous[id] ? previous[id] : row;
            }
            return row;
          });

          //obj.
          //console.log(obj)
          setOpen([true, "success", response.data.msg]);
          setRows(newRows);
          setDummy(dummy + 1);
          // setRows([obj,...rows]);
          //display success
        }
      })
      .catch(function(error) {
        setOpen([true, "error", error.response.data.err]);
        console.log(error.response.data);
      });
    // console.log(newRows)
    // onToggleEditMode(id);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // setOpen(true);
      return;
    }

    setOpen([false, open[1], open[2]]);
  };
  //end of responsive entries
  console.log(rows);
  return (
    <>

      <Fragment>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="left" />
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Department </TableCell>
                <TableCell align="left">Salary</TableCell>
                <TableCell align="left">Office Location </TableCell>
                <TableCell align="left">Role </TableCell>
                <TableCell align="left">DayOff </TableCell>
                <TableCell align="left">Gender </TableCell>
                <TableCell align="left">Attendance </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {role === "HR" ? (
                <>
                  <TableRow key="">
                    <TableCell className={classes.selectTableCell}>
                      <IconButton
                        title="add"
                        aria-label="add"
                        onClick={() => onAdding("add")}
                      >
                        <PlusIcon />
                      </IconButton>
                    </TableCell>
                    <CustomTableCell
                    {...{ row:initRow, name: "id", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row:initRow, name: "name", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row:initRow, name: "email", onChange, deps,locs }}
                  />
                     <CustomTableCell
                    {...{ row:initRow, name: "departmentTemp", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row:initRow, name: "salaryTemp", onChange, deps,locs }}
                  />

                  <CustomTableCell
                    {...{ row:initRow, name: "officeLocationTemp", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row:initRow, name: "roleTemp", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row:initRow, name: "dayOff", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row:initRow, name: "gender", onChange, deps,locs }}
                  />
                  <TableCell  align="left" className={classes.tableCell}></TableCell>
                  </TableRow>
                </>
              ) : (
                <></>
              )}
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map(row => (
                <TableRow key={row.id}>
                  <TableCell className={classes.selectTableCell}>
                    {role === "HR" && row.isEditMode ? (
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
                    ) : role === "HR" ? (
                      <div style={{ display: "flex" }}>
                        <IconButton
                          title="edit"
                          aria-label="edit"
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <AlertDialog
                          entry="Staff Member"
                          onClick={e =>
                            onDelete({ ...e, id: row.id })
                          }
                          row={row.id}
                        >
                          {" "}
                        </AlertDialog>
                      </div>
                    ) : (
                      <></>
                    )}
                  </TableCell>
   
                  <CustomTableCell
                    {...{ row, name: "id", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row, name: "name", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row, name: "email", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row, name: "departmentTemp", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row, name: "salaryTemp", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row, name: "officeLocationTemp", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row, name: "roleTemp", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row, name: "dayOff", onChange, deps,locs }}
                  />
                  <CustomTableCell
                    {...{ row, name: "gender", onChange, deps,locs }}
                  />
                  <TableCell align="left" className={classes.tableCell}>
                  <Button
                  style={{    width: "100px",
                    position: "relative",
                    left: "-16px"}}
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    history.push({
                      pathname: '/AttendanceLogsHR',
                      state: {
                        id:row.id
                      }
                    })
                  }>
                  View logs
                </Button>
                </TableCell>
                  {/* <TableCell component="th" scope="row" >
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.code}</TableCell> */}
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
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
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
      <Snackbar
        open={open[0]}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert variant="filled" onClose={handleClose} severity={open[1]}>
          {open[2]}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
