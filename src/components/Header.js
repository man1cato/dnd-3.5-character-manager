import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = ({startLogout}) => (
    <header className="header">
        <div className="container">
            <div className="header__content">
                <Link className="header__title" to="/profile" exact={true}>
                    <h2>D&D 3.5 Character Manager</h2>
                </Link>
                <button className="button button--link" onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
