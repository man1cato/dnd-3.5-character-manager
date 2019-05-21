import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    hasProfile,
    hasProfiles,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            hasProfile ? (
                <Redirect to="/profile" />
            ) : (
                hasProfiles ? (
                    <Redirect to="/select" />
                ) : (
                    <Redirect to="/create" />
                )
            )
        ) : (
            <Component {...props}/>
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    hasProfile: !!state.profile.id,
    hasProfiles: state.profiles.length > 1
});

export default connect(mapStateToProps)(PublicRoute);
