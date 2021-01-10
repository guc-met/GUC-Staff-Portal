import React, { Fragment, useState } from 'react';

import Input from '@material-ui/core/Input';
import { ExampleWrapperSimple } from '../../layout-components';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/DoneAllTwoTone';

import CancelIcon from '@material-ui/icons/CancelOutlined';
import axios from 'axios';
import Attendance from '../../example-components/Attendance';

const useStyles = makeStyles({
  input: {
    width: 180,
    height: 30
  }
});

export default function DashboardDefault() {
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

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onCancel = () => {
    setEmail(profile.Email);
    setProfile({ ...profile, isEditMode: !profile.isEditMode });
  };

  const onApporval = async () => {
    console.log(localStorage.getItem('UserToken'));
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
        if (response.data !== 'This email already in use') {
          setEmail(response.data);
          setProfile({
            ...profile,
            isEditMode: !profile.isEditMode,
            Email: response.data
          });
        } else {
          console.log('This email already in use');
        }
      })
      .catch(function(error) {
        console.log(error.response.data);
      });
  };
  return (
    <>
      <Fragment>
        <ExampleWrapperSimple sectionHeading="Profile">
          <Grid container spacing={3}>
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
            <Grid item xs={12} lg={8}>
              {profile['Off day']}
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
    </>
  );
}
