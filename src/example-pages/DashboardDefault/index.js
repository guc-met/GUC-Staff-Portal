import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';

import DashboardDefaultSection1 from '../../example-components/DashboardDefault/DashboardDefaultSection1';
import DashboardDefaultSection2 from '../../example-components/DashboardDefault/DashboardDefaultSection2';
import DashboardDefaultSection3 from '../../example-components/DashboardDefault/DashboardDefaultSection3';
import DashboardDefaultSection4 from '../../example-components/DashboardDefault/DashboardDefaultSection4';

import { ExampleWrapperSimple } from '../../layout-components';
import {
  Grid,
  FormControlLabel,
  Checkbox,
  Card,
  MenuItem,
  TextField,
  FormControl,
  FormHelperText,
  Divider
} from '@material-ui/core';

export default function DashboardDefault() {
  return (
    <Fragment>


      <ExampleWrapperSimple sectionHeading="Profile">
      <Grid container spacing={3} className="p-2">
                <Grid item xs={12} lg={4} >
                  <h6> Name </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  Eslam Sabry Basha
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Email</h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  eslam.221@gmail.com
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Office </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  17121
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Gender </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  Male
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Salary </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  15000
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Current Month Salary </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  25000
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Role </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  King
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Dayoff</h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  Sat-Fri
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Faculty </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  Media Engineering and Technology (MET)
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Department </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  Computer Sceince and Engineering (CSEN)
                </Grid>

                <Grid item xs={12} lg={4}>
                <h6> Courses </h6>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <ul> 
                    <li> Fist onr</li>
                    <li> Fist onr</li>
                    <li> Fist onr</li>
                    <li> Fist onr</li>
                  </ul>
                </Grid>

              </Grid>
            <div className="divider my-2" />
      </ExampleWrapperSimple>

    </Fragment>
  );
}
