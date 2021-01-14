import React, { Fragment, useState } from 'react';

import { Grid, Card, CardContent, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Attendance() {
  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .get('http://localhost:3001/staff/viewMissingDays', {
          headers: {
            token: localStorage.getItem('UserToken')
          }
        })
        .then(function(response) {
          return response.data.length;
        })
        .catch(function(error) {
          console.log(error.response.data);
          return '';
        });
      console.log(response)
      setDays(response);
    }
    FetchData();
  }, []);

  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .get('http://localhost:3001/staff/viewMissingHours', {
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
      setHours(response);
    }
    FetchData();
  }, []);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState({
    Missinghours: 0,
    ExtraHours: 0
  });
  const history = useHistory();
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="mb-4">
            <img
              alt="..."
              className="card-img-top"
              src={
                'https://www.cusd80.com/cms/lib/AZ01001175/Centricity/Domain/1290/Attendance%20Image%20.png'
              }
            />
            <CardContent>
              <div>
                <p style={{ marginTop: 2, display: 'inline-block' }}>
                  Missing days : {days}
                </p>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  style={{ float: 'right' }}
                  onClick={() =>
                    history.push({
                      pathname: '/AttendanceLogs',
                      state: {
                        isMissingDays: true
                      }
                    })
                  }>
                  Missing days
                </Button>
              </div>
              <p style={{ marginTop: 2, display: 'block' }}>
                Missing hours : {hours.Missinghours}
              </p>
              <p style={{ marginTop: 2, display: 'block' }}>
                Extra hours : {hours.ExtraHours}
              </p>
              <div style={{ textAlign: 'center' }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() =>
                    history.push({
                      pathname: '/AttendanceLogs',
                      state: {
                        isMissingDays: false
                      }
                    })
                  }>
                  View logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}
