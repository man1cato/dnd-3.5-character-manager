import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    hasProfile,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            hasProfile ? (
                <Redirect to="/profile" />
            ) : (
                <Redirect to="/create" />
            )
        ) : (
            <Component {...props}/>
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    hasProfile: !!state.profile.id
});

export default connect(mapStateToProps)(PublicRoute);
