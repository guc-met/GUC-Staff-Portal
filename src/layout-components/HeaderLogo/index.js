import React, { Fragment } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { IconButton, Box } from '@material-ui/core';

// import projectLogo from '../../assets/images/react.svg';
import projectLogo from '../../assets/images/G.png';

const HeaderLogo = props => {
  return (
    <Fragment>
      <div className={clsx('app-header-logo', {})}>
        <Box className="header-logo-wrapper" title="Home">
          <Link to="/HomePage" className="header-logo-wrapper-link">
            <IconButton
              color="primary"
              size="medium"
              className="header-logo-wrapper-btn">
              <img
                className="app-header-logo-img"
                alt="Home"
                src={projectLogo}
              />
            </IconButton>
          </Link>
          <Box className="header-logo-text">GUC Staff Portal</Box>
        </Box>
      </div>
    </Fragment>
  );
};

export default HeaderLogo;
