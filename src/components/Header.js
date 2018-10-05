import React from 'react';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = (props) => (
  <header>
    <div className="container header__content">
      <h2 className="header__title">{props.pageTitle}</h2>
      <button onClick={props.startLogout}>Logout</button>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
