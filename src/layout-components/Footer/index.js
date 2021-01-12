import React, { Fragment } from 'react';

import clsx from 'clsx';

import { Paper } from '@material-ui/core';

import { connect } from 'react-redux';

const Footer = props => {
  const { footerFixed } = props;
  return (
    <Fragment>
      <Paper
        square
        className={clsx('app-footer text-black-50', {
          'app-footer--fixed': footerFixed
        })}>
        <div className="app-footer--inner">
          <div className="app-footer--second">
            <span>German University in Cairo</span> © 2021 - crafted with{' '}
            <span className="text-danger px-1">❤</span> by 43- BALABIZO
          </div>
        </div>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed
});
export default connect(mapStateToProps)(Footer);
