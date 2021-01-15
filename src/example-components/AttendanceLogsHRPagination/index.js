import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    float: "right"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

export default function AttendanceLogs(props) {
  const classes = useStyles();
  const [logs, setLogs] = useState([]);
  const [MissingDays, setMissingDays] = useState(0);
  const [Missinghrs, setMissinghrs] = useState(0.0);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [logType, setType] = React.useState("");
  const [open, setOpen] = useState([false, "", ""]);
  const userID = props.userID;
  const columns = [
    {
      icons: DeleteIcon,
      field: "Type",
      hideable: false,
      filterable: false,
      headerName: "Type",
      sortable: false,
      width: 130,
      toolbar: false
    },
    {
      field: "DayName",
      filterable: false,
      headerName: "Day",
      sortable: false,
      width: 130
    },
    {
      field: "Month",
      sortable: false,
      hideable: false,
      headerName: "Month",
      width: 130
    },
    {
      field: "YearNo",
      filterable: false,
      headerName: "Year",
      sortable: false,
      width: 130
    },
    {
      field: "Time",
      filterable: false,
      headerName: "Time",
      sortable: false,
      width: 130
    }
  ];
  console.log(userID);
  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .post(
          "http://localhost:3001/hr/viewAttendanceStaff",
          {
            id: userID
          },
          {
            headers: {
              token: localStorage.getItem("UserToken")
            }
          }
        )
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error.response.data);
          return "";
        });
      setLogs(response);
    }
    FetchData();
  }, [userID]);

  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .post(
          "http://localhost:3001/hr/showMissingDaysHr",
          {
            id: userID
          },
          {
            headers: {
              token: localStorage.getItem("UserToken")
            }
          }
        )
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error.response.data);
          return "";
        });
      setMissingDays(response.days);
    }
    FetchData();
  }, [userID]);

  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .post(
          "http://localhost:3001/hr/showMissingHoursHr",
          {
            id: userID
          },
          {
            headers: {
              token: localStorage.getItem("UserToken")
            }
          }
        )
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error.response.data);
          return "";
        });
      console.log(response);
      setMissinghrs(response.missingHours);
    }
    FetchData();
  }, [userID]);

  const takeDatePicker = date => {
    setSelectedDate(new Date(date.target.value));
    console.log(selectedDate);
  };
  const takeLogType = e => {
    setType(e.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen([false, open[1], open[2]]);
  };
  const onAddLog = () => {
    axios
      .post(
        "http://localhost:3001/hr/addSignRec",
        {
          id: userID,
          timeStamp: selectedDate,
          type: logType
        },
        {
          headers: {
            token: localStorage.getItem("UserToken")
          }
        }
      )
      .then(function(response) {
        console.log(response.data);
        setOpen([true, "success", response.data.msg]);
      })
      .catch(function(error) {
        setOpen([true, "error", error.response.data.err]);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{
          float: "right",
          width: "100px",
          position: "relative",
          top: "10px"
        }}
        onClick={onAddLog}
      >
        Add Log
      </Button>
      <div>
        <TextField
          id="log"
          label="Type of Log"
          variant="outlined"
          required
          value={logType}
          onChange={takeLogType}
          style={{ float: "right" }}
        />
        <form className={classes.container} noValidate>
          <TextField
            id="datetime-local"
            label="Log date"
            type="datetime-local"
            onChange={takeDatePicker}
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
      </div>
      <h3>Missing Days {MissingDays}</h3>
      <h3>Missing hours {Missinghrs}</h3>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid rows={logs} columns={columns} pageSize={10} />
      </div>
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
