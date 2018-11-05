import React from 'react';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = (props) => (
  <header>
    <div className="container d-flex justify-content-between align-items-center">
      <h2 className="text-white m-0">{props.pageTitle}</h2>
      <button className="btn button--navbar" onClick={props.startLogout}>Logout</button>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
