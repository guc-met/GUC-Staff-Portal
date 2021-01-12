import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Menu, Button, List, ListItem, Divider } from '@material-ui/core';
import axios from 'axios';

export default function HeaderUserbox() {
  React.useEffect(() => {
    async function FetchData() {
      const response = await axios
        .get('http://localhost:3001/staff/getUserData', {
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
      setUserName(response.name);
      setUserRole(response.role);
    }
    FetchData();
  }, []);
  const [userName, setUserName] = React.useState('');
  const [userRole, setUserRole] = React.useState('');

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

  const viewProfileClick = () => {
    history.push('/DashboardDefault');
  };

  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        <Box>{userName}</Box>
        <div className="d-none pl-3">
          <div>{userName}</div>
          <span className="text-white-50">{userRole}</span>
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
                {userName}
              </div>
              <span className="text-black-50 text-center">{userRole}</span>
            </div>
            <Divider className="w-100" />
            <ListItem button onClick={viewProfileClick}>
              View Profile
            </ListItem>
            {/* <ListItem button>Sign in</ListItem>
            <ListItem button>Sign out</ListItem> */}
            <Divider className="w-100" />
            <ListItem button>Reset password</ListItem>
            <Divider className="w-100" />
            <ListItem button onClick={logOut}>
              Log out
            </ListItem>
          </List>
        </div>
      </Menu>
    </Fragment>
  );
}
