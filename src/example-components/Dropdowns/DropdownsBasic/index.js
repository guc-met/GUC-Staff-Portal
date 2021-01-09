import React from 'react';

import { Menu, MenuItem, Button } from '@material-ui/core';

export default function LivePreviewExample(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [choice, setChoice] = React.useState("Select "+props.field);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if(event.target.innerText==''){
      event.target.innerText=choice
    }
    //console.log(event.target.innerText)
    setChoice(event.target.innerText);
    setAnchorEl(null);
  };

  return (
    <div>
    <Button
        aria-controls="simple-menu"
        variant="contained"
        color="primary"
        aria-haspopup="true"
        onClick={handleClick}>
        {choice}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {/* <MenuItem   onClick={(event) => {handleClose(event)}}>Select { props.field}</MenuItem>
        {props.data.map(entry=>(
            <MenuItem onClick={(event) => {    props.onChange            }} value={entry}>{entry}</MenuItem>
          ))} */}
        
      </Menu>
    </div>
  );
}
