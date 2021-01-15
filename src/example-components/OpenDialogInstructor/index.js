import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const [openX, setOpenX] = React.useState([false,'bottom','success','all good']);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const removeMember=()=>{
    console.log(props.id)
    console.log(props.name)
    axios
    .delete(
      'http://localhost:3001/inst/removeAssignedMember',
      {
        headers: {
          token: localStorage.getItem('UserToken'),
        },data:{course:props.course,  acadMem:props.id}
      }
    )
    .then(function(response) {
      console.log(response)
      if(response.status!=200)//that's an error
        setOpenX([true,'top',"error",response.data.err]);
      else{
        setOpenX([true,'top',"success",response.data.msg]);
        //window.location.reload(false)
      }
     })

    .catch(function(error) {
      console.log(error.response)
      setOpenX([true,'top',"error",error.response.data.err]);
    });
  }

  const setCoordinator=()=>{
    console.log(props.id)
    console.log(props.name)
    axios
    .post(
      'http://localhost:3001/inst/assignCoordinator',
      {
        course:props.course,  coordId:props.id
      },
      {
        headers: {
          token: localStorage.getItem('UserToken'),
        }
      }
    )
    .then(function(response) {
      console.log(response)
      if(response.status!=200)//that's an error
        setOpenX([true,'top',"error",response.data.err]);
      else{
        setOpenX([true,'top',"success",response.data.msg]);
        //window.location.reload(false)
      }
     })

    .catch(function(error) {
      setOpenX([true,'top',"error",error.response.data.err]);
    });
  }

  const handleCloseX = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenX([false,openX[1],openX[2],openX[3]]);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Select Member
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Member 
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          <h4 style={{color:'midnightblue', fontFamily:'sans-serif'}}>{props.name}</h4>
          <h3 style={{color:'blue', fontFamily:'sans-serif'}}>Remove an assigned academic member in course(s) he/she is assigned to.
        Assign an academic member in each of his/her course(s) to be a course coordinator.</h3>
        <h6 style={{color:'midnightblue', fontFamily:'sans-serif'}}>Refresh the page after succsseful operation</h6>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={removeMember} color="primary">
            Remove the member
          </Button>
          <Button autoFocus onClick={setCoordinator} color="primary">
            Assign as course coordinator
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openX[0]} onClose={handleCloseX} anchorOrigin={{ vertical:openX[1], horizontal :'center'}}>
      <MuiAlert variant='filled' onClose={handleCloseX} severity={openX[2]}>
        {openX[3]}
      </MuiAlert>
    </Snackbar>
    </div>
  );
}
