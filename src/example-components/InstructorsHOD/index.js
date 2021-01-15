import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import AssignCourseToInstructor from '../../example-pages/AssignCourseToInstructor';
import DeleteCourseFromInstructor from '../../example-pages/DeleteCourseFromInstructor';
import UpdateCourseForInstructor from '../../example-pages/updateCourseForInstructor';

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
 
  const [stateAdd,setStateAdd] =React.useState(false);
  const [stateDelete,setStateDelete] =React.useState(false);
  const [stateUpdate,setStateUpdate] =React.useState(false);  

  const onChangeAdd = (e)=>{
           setStateAdd(true);
           setStateUpdate(false);
           setStateDelete(false);
  }
  
const onChangeDelete =(e)=>{
    setStateDelete(true);
    setStateAdd(false);
    setStateUpdate(false);
}

const onChangeUpdate =(e)=>{
    setStateUpdate(true);
    setStateDelete(false);
    setStateAdd(false);
}

  return (
   
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={onChangeAdd}>Assign</Button>
        <Button onClick={onChangeDelete}>Delete</Button>
        <Button onClick={onChangeUpdate}>Update</Button>
      </ButtonGroup>
      {stateUpdate && <UpdateCourseForInstructor/>}
      {stateAdd && <AssignCourseToInstructor/>}
      {stateDelete && <DeleteCourseFromInstructor/>}
    </div>
  );
}
