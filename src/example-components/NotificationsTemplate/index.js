import React, { Fragment, useState } from "react";

import { Grid, Card, CardContent, Button } from "@material-ui/core";
import { PageTitle } from '../../layout-components';
import { ExampleWrapperSimple } from '../../layout-components';
import axios from "axios";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

export default function Attendance() {
    React.useEffect(() => {
        async function FetchData() {
            const response = await axios
              .get('http://localhost:3001/ac/notification', {
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
              console.log(response);
            if(undefined!==response[0])
                setStateA(response[0]);
            if(undefined!==response[1])
                setStateB(response[1]);
            console.log('hi')
        }

        FetchData();
      });
    //   setInterval(()=>{
    //     console.log('interval triggered');
    //   },5000)
      let i=0;
      let j=0;
      const [stateA,setStateA]=React.useState(0);
      const [stateB,setStateB]=React.useState(0);
  return (
    <Fragment>
    <ExampleWrapperSimple sectionHeading="Notifications">
    <Badge badgeContent={stateA} color="primary" showZero>
        <MailIcon />
      </Badge>
      <Badge badgeContent={stateB} color="error" showZero>
        <MailIcon />
      </Badge>        
    </ExampleWrapperSimple>
  </Fragment>
  );
}
