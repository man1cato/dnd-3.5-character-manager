import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'


export const ProfilesRoute = ({
    isAuthenticated,
    hasProfiles,
    component: Component,
    pageTitle,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated && hasProfiles ? (
            <>
                <Header pageTitle={pageTitle}/>
                <Component {...props} />   
            </>
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
