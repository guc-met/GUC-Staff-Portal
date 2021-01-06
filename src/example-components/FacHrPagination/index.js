import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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

export default function LivePreviewExample() {
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //for responsive entries
  const [rows, setRows] = React.useState([
    createData('Law', 'LAW'),
    createData('Donut', 452),
    createData('Engineering', 'ENG'),
    createData('Architecture', 'ARCH'),
    createData('Gingerbread', 356),
    createData('Honeycomb', 408),
    createData('Applied Arts', 'APP'),
    createData('Jelly Bean', 375),
    createData('KitKat', 518),
    createData('Lollipop', 392),
    createData('Pharmacy', 'PHA'),
    createData('Nougat', 360),
    createData('Oreo', 437)
  ]);
  const [previous, setPrevious] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
      //TODO
    // setRows((state) => {
    //   return rows.map((row) => {
    //     if (row.id === id) {
    //       return { ...row, isEditMode: !row.isEditMode };
    //     }
    //     return row;
    //   });

    //validate new faculty and add to db then send notification
   
    let obj={id:initRow.codeTemp,idTemp:initRow.codeTemp,code:initRow.codeTemp,codeTemp:initRow.codeTemp,name:initRow.nameTemp,nameTemp:initRow.nameTemp,isEditMode:false};
   // let newRows=rows;
    //newRows.push(obj)
    //rows.push(obj)
    setRows([obj,...rows]);
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
          if(name=="code"){
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

  const onDelete = (id) => {
    const newRows = rows.map((row, index) => {
      if (row.id === id) {
        rows.splice(index, 1);
        //return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
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
    console.log(newRows)
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };
    const onApproval = (id) => {
    const newRows = rows.map((row, index) => {
       if (row.id === id) {
           row.code=row.codeTemp;
           row.name=row.nameTemp;
           row.idTemp=row.codeTemp;
           row.id=row.idTemp;
         return { ...row, isEditMode: !row.isEditMode };
         //return previous[id] ? previous[id] : row;
       }
      return row;
    });
    setRows(newRows);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    console.log(newRows)
   // onToggleEditMode(id);
  };
  //end of responsive entries

  return (
    <Fragment>
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
                  <>
                  <IconButton
                    title="edit"
                    aria-label="edit"
                    onClick={() => onToggleEditMode(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                    <IconButton
                      title="delete"
                      aria-label="delete"
                      onClick={() => onDelete(row.id)}
                    >
                      
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
              {/* component="th" scope="row" */}
              <CustomTableCell  {...{ row, name: "codeTemp", onChange }} />
              <CustomTableCell  {...{ row, name: "nameTemp", onChange }} />
             
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
  );
}
