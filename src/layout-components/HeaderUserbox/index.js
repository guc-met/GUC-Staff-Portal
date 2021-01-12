import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Menu, Button, List, ListItem, Divider } from '@material-ui/core';
import axios from 'axios';

const jwt = require('jsonwebtoken');
const tokenS = 'sdkjfhjsdhafhkjhjkwekfhjkasdfjkh';
const result = jwt.verify(localStorage.getItem('UserToken'), tokenS);
const username = result.name;
const usertype = result.role;
export default function HeaderUserbox() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const logOut = async () => {
    axios
      .get('http://localhost:3001/staff/logout', {
        headers: {
          token: localStorage.getItem('UserToken')
        }
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error.response.data);
      });
    localStorage.removeItem('UserToken');
    history.push('/Login');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        {/* <Box>
          <Avatar sizes="44" alt="Emma Taylor" src={avatar5} />
        </Box> */}

        <Box>{username}</Box>
        <div className="d-none pl-3">
          <div className="font-weight-bold pt-2 line-height-1">{username}</div>
          <span className="text-white-50">{usertype}</span>
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className="ml-2">
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            <div className="pl-3  pr-3">
              <div className="font-weight-bold text-center pt-2 line-height-1">
                {username}
              </div>
              <span className="text-black-50 text-center">{usertype}</span>
            </div>
            <Divider className="w-100 mt-2" />
            <ListItem button>View Profile</ListItem>
            <ListItem button>Sign in</ListItem>
            <ListItem button>Sign out</ListItem>
            <Divider className="w-100" />
            <ListItem className="d-block rounded-bottom px-3 pt-3 pb-0 text-center">
              <ListItem button onClick={logOut}>
                Log out
              </ListItem>
            </ListItem>
          </List>
        </div>
      </Menu>
    </Fragment>
  );
}
