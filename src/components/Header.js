import React from 'react';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = ({startLogout}) => (
  <header className="header">
    <div className="container container--header">
      <div className="header__content">
        <h2 className="header__title">D&D 3.5 Character Manager</h2>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
