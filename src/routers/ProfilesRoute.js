import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'


export const ProfilesRoute = ({
    isAuthenticated,
    hasProfiles,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated && hasProfiles ? (
            <Component {...props} />   
        ) : (
            <Redirect to="/" />
        )
    )} />
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    hasProfiles: state.profiles.length > 1
})

export default connect(mapStateToProps)(ProfilesRoute);
