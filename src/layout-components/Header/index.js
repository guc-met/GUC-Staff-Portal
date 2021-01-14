import React, { Fragment, useState } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import {
  Hidden,
  IconButton,
  AppBar,
  Box,
  Button,
  Tooltip
} from '@material-ui/core';

import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../reducers/ThemeOptions';

import projectLogo from '../../assets/images/G.png';

import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const Header = props => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile
  } = props;
  const [open, setOpen] = useState([
    false,
    'Signed in in university',
    'Signed out from university'
  ]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      // setOpen(true);
      return;
    }
    setOpen([false, open[1], open[2]]);
  };

  const signIn = async () => {
    axios
      .post(
        'http://localhost:3001/staff/signIn',
        {},
        {
          headers: {
            token: localStorage.getItem('UserToken')
          }
        }
      )
      .then(function(response) {
        setOpen([true, 'success', response.data.msg]);
      })
      .catch(function(error) {
        console.log(error.response.data);
        setOpen([true, 'error', error.response.data.err + '']);
      });
  };
  const signOut = async () => {
    axios
      .post(
        'http://localhost:3001/staff/signOut',
        {},
        {
          headers: {
            token: localStorage.getItem('UserToken')
          }
        }
      )
      .then(function(response) {
        setOpen([true, 'success', response.data.msg]);
      })
      .catch(function(error) {
        console.log(error.response.data);
        setOpen([true, 'error', error.response.data.err + '']);
      });
  };
  return (
    <>
      <Fragment>
        <AppBar
          color="secondary"
          className={clsx('app-header', {})}
          position={headerFixed ? 'fixed' : 'absolute'}
          elevation={headerShadow ? 11 : 3}>
          {!props.isCollapsedLayout && <HeaderLogo />}
          <Box className="app-header-toolbar">
            <Hidden lgUp>
              <Box className="app-logo-wrapper" title="">
                <Link to="/HomePage" className="app-logo-link">
                  <IconButton
                    color="primary"
                    size="medium"
                    className="app-logo-btn">
                    <img
                      className="app-logo-img"
                      alt="Home"
                      src={projectLogo}
                    />
                  </IconButton>
                </Link>
                <Hidden smDown>
                  <Box>GUC Staff Portal</Box>
                </Hidden>
              </Box>
            </Hidden>
            <Hidden mdDown>
              <Box className="d-flex align-items-center">
                <Button
                  target="_blank"
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={signIn}
                  className="mr-3">
                  Sign in
                </Button>
                <Button
                  target="_blank"
                  size="small"
                  onClick={signOut}
                  variant="contained"
                  color="primary">
                  Sign out
                </Button>
              </Box>
            </Hidden>
            <Box className="d-flex align-items-center">
              <HeaderUserbox />
              <Box className="toggle-sidebar-btn-mobile">
                <Tooltip title="Toggle Sidebar" placement="right">
                  <IconButton
                    color="inherit"
                    onClick={toggleSidebarMobile}
                    size="medium">
                    {sidebarToggleMobile ? (
                      <MenuOpenRoundedIcon />
                    ) : (
                      <MenuRoundedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </AppBar>
      </Fragment>
      <Snackbar
        open={open[0]}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert variant="filled" onClose={handleClose} severity={open[1]}>
          {open[2]}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
