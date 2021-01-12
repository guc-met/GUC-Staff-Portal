import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BasicButtonGroup() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
        <Button view="all">All</Button>
        <Button view="pending">Pending</Button>
        <Button view="accepted">Accepted</Button>
        <Button view="rejected">Rejected</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button requestType="replacementRequests">Replacement</Button>
        <Button requestType="leaveRequests">Leave</Button>
        <Button requestType="slotLinkingRequests">Slot Linking</Button>
        <Button requestType="changeDayOffRequests">Change Day Off</Button>
      </ButtonGroup>
    </div>
  );
}
