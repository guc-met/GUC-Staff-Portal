import React, { Fragment, useState } from 'react';

import Input from '@material-ui/core/Input';
import { ExampleWrapperSimple } from '../../layout-components';
import { Grid, makeStyles, IconButton, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Attendance from '../../example-components/Attendance';

const useStyles = makeStyles({
  input: {
    width: 180,
    height: 30
  }
});

export default function HomePage() {
  const classes = useStyles();
  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .get('http://localhost:3001/staff/viewProfile', {
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
      response.isEditMode = false;
      setProfile(response);
      setEmail(response.Email);
    }
    FetchData();
  }, []);

  const [profile, setProfile] = useState('');
  const [email, setEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setnewPass] = useState('');
  const [newPass2, setnewPass2] = useState('');
  const [open, setOpen] = useState([false, '', '']);
  const [openDial, setopenDial] = React.useState(false);
  const [openDialD, setopenDialD] = React.useState(false);
  const [dayyOff, setTakeDayyOff] = useState('');
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen([false, open[1], open[2]]);
  };
  const onCancel = () => {
    setEmail(profile.Email);
    setProfile({ ...profile, isEditMode: !profile.isEditMode });
  };
  const setDialog = () => {
    setopenDial(true);
  };
  const setDayOff = () => {
    setopenDialD(true);
  };
  const takeOldPass = e => {
    setOldPass(e.target.value);
  };
  const takeNewPass = e => {
    setnewPass(e.target.value);
  };
  const takeNewPass2 = e => {
    setnewPass2(e.target.value);
  };
  const takeDayyOff = e => {
    setTakeDayyOff(e.target.value);
  };
  const takeReason = e => {
    setReason(e.target.value);
  };
  const takeComment = e => {
    setComment(e.target.value);
  };
  const resetPass = () => {
    if (newPass !== newPass2) {
      setOpen([true, 'error', 'New password does not match']);
      return;
    }
    axios
      .put(
        'http://localhost:3001/staff/resetPassword',
        {
          oldPassword: oldPass,
          newPassword: newPass
        },
        {
          headers: {
            token: localStorage.getItem('UserToken')
          }
        }
      )
      .then(function(response) {
        console.log(response.data);
        if (response.data === 'please enter your old password') {
          setOpen([true, 'error', response.data]);
        }
        if (response.data === 'Your password has changed successfully') {
          setOpen([true, 'success', response.data]);
          setopenDial(false);
        }
      })
      .catch(function(error) {
        console.log(error.response.data);
        if (error.response.data === 'Old password is not correct') {
          setOpen([true, 'error', error.response.data]);
        }
        if (
          error.response.data === 'New password must has at least 6 charachters'
        ) {
          setOpen([true, 'error', error.response.data]);
        }
      });
    setnewPass('');
    setnewPass2('');
    setOldPass('');
  };

  const sendDayOffRequest = async () => {
    axios
      .post(
        'http://localhost:3001/ac/changeDayOff',
        {
          newday: dayyOff,
          reasonOfChange: reason,
          comment: comment
        },
        {
          headers: {
            token: localStorage.getItem('UserToken')
          }
        }
      )
      .then(function(response) {
        setopenDialD(false);
        setOpen([true, 'success', response.data]);
      })
      .catch(function(error) {
        console.log(error.response.data.err);
        setOpen([true, 'error', error.response.data.err]);
      });
  };

  const onApporval = async () => {
    axios
      .put(
        'http://localhost:3001/staff/updateProfile',
        {
          email: email
        },
        {
          headers: {
            token: localStorage.getItem('UserToken')
          }
        }
      )
      .then(function(response) {
        if (response.data === 'Cannot update empty mail') {
          setOpen([true, 'error', response.data]);
          return;
        }
        if (response.data !== 'This email already in use') {
          setEmail(response.data);
          setProfile({
            ...profile,
            isEditMode: !profile.isEditMode,
            Email: response.data
          });
          setOpen([true, 'success', 'Email updated successfully']);
        } else {
          setOpen([true, 'error', response.data]);
        }
      })
      .catch(function(error) {
        console.log(error.response.data.err);
        setOpen([true, 'error', error.response.data.err]);
      });
  };
  return (
    <>
      <Fragment>
        <ExampleWrapperSimple sectionHeading="Profile">
          <Grid container spacing={4}>
            <Grid item xs={12} lg={4}>
              <h6> Name </h6>
            </Grid>
            <Grid item xs={12} lg={8}>
              {profile.Name}
            </Grid>

            <Grid item xs={12} lg={4}>
              <h6> Email</h6>
            </Grid>
            <Grid item xs={12} lg={7}>
              {profile.isEditMode ? (
                <Input
                  value={email}
                  onChange={onChangeEmail}
                  name="email"
                  className={classes.input}
                />
              ) : (
                email
              )}
            </Grid>
            <Grid item xs={12} lg={1}>
              {profile.isEditMode ? (
                <>
                  <IconButton
                    title="confirm"
                    aria-label="confirm"
                    onClick={onApporval}>
                    <DoneIcon />
                  </IconButton>
                  <IconButton
                    title="cancel"
                    aria-label="cancel"
                    onClick={onCancel}>
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    title="edit"
                    aria-label="edit"
                    onClick={() =>
                      setProfile({
                        ...profile,
                        isEditMode: !profile.isEditMode
                      })
                    }>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </Grid>
            <Grid item xs={12} lg={4}>
              <h6> Password </h6>
            </Grid>
            <Grid item xs={12} lg={7}>
              *********
            </Grid>
            <Grid item xs={12} lg={1}>
              <IconButton title="edit" aria-label="edit" onClick={setDialog}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} lg={4}>
              <h6> Office </h6>
            </Grid>
            <Grid item xs={12} lg={8}>
              {profile['Office location']}
            </Grid>

            <Grid item xs={12} lg={4}>
              <h6> Gender </h6>
            </Grid>
            <Grid item xs={12} lg={8}>
              {profile.Gender}
            </Grid>

            <Grid item xs={12} lg={4}>
              <h6> Salary </h6>
            </Grid>
            <Grid item xs={12} lg={8}>
              {profile.Salary}
            </Grid>

            {/* <Grid item xs={12} lg={4}>
            <h6> Current Month Salary </h6>
          </Grid>
          <Grid item xs={12} lg={8}>   to be doneeeeeee
          {profile.NewSalary}
          </Grid> */}

            <Grid item xs={12} lg={4}>
              <h6> Role </h6>
            </Grid>
            <Grid item xs={12} lg={8}>
              {profile.Role}
            </Grid>

            <Grid item xs={12} lg={4}>
              <h6> Dayoff</h6>
            </Grid>
            <Grid item xs={12} lg={7}>
              {profile['Off day']}
            </Grid>
            <Grid item xs={12} lg={1}>
              <IconButton title="edit" aria-label="edit" onClick={setDayOff}>
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={12} lg={4}>
              <h6> Faculty </h6>
            </Grid>
            <Grid item xs={12} lg={8}>
              {profile.Faculty}
            </Grid>

            <Grid item xs={12} lg={4}>
              <h6> Department </h6>
            </Grid>
            <Grid item xs={12} lg={8}>
              {profile.Department}
            </Grid>

            <Grid item xs={12} lg={4}>
              <h6> Courses </h6>
            </Grid>
            <Grid item xs={12} lg={8}>
              <ol>{profile['My courses']}</ol>
            </Grid>
          </Grid>
        </ExampleWrapperSimple>
      </Fragment>
      <Attendance />
      <div>
        <Dialog open={openDial}>
          <h1
            style={{
              textAlign: 'center',
              width: '400px',
              font: 'bold',
              fontSize: '19px'
            }}>
            Reset Password
          </h1>
          <DialogContent>
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              id="oldpass"
              label="Old Password"
              value={oldPass}
              onChange={takeOldPass}
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <TextField
              variant="outlined"
              margin="normal"
              id="newpass"
              label="New Password"
              value={newPass}
              onChange={takeNewPass}
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <TextField
              variant="outlined"
              margin="normal"
              id="newpass2"
              value={newPass2}
              onChange={takeNewPass2}
              label="Re-enter new password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                setopenDial(false);
                setnewPass('');
                setnewPass2('');
                setOldPass('');
              }}>
              Cancel
            </Button>
            <Button color="primary" onClick={resetPass}>
              Reset
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={openDialD}>
          <h1
            style={{
              textAlign: 'center',
              width: '400px',
              font: 'bold',
              fontSize: '19px'
            }}>
            Day Off Request
          </h1>
          <DialogContent>
            <TextField
              autoFocus
              variant="outlined"
              margin="normal"
              id="day"
              label="day"
              value={dayyOff}
              onChange={takeDayyOff}
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <TextField
              variant="outlined"
              margin="normal"
              id="reason"
              label="Reason"
              value={reason}
              onChange={takeReason}
              fullWidth
            />
          </DialogContent>

          <DialogContent>
            <TextField
              variant="outlined"
              margin="normal"
              id="comment"
              value={comment}
              onChange={takeComment}
              label="Comment"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => {
                setDayOff('');
                setReason('');
                setComment('');
                setopenDialD(false);
              }}>
              Cancel
            </Button>
            <Button color="primary" onClick={sendDayOffRequest}>
              Request
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar
        open={open[0]}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert variant="filled" onClose={handleClose} severity={open[1]}>
          {open[2]}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
