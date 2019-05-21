import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

export const ProfileRoute = ({
   isAuthenticated,
   hasProfile,
   component: Component,
   ...rest
}) => (
   <Route {...rest} component={(props) => (
       isAuthenticated && hasProfile ? (
            <Component {...props} />    
       ) : (
           <Redirect to="/" />
       )
   )} />
);

const mapStateToProps = (state) => ({
   isAuthenticated: !!state.auth.uid,
   hasProfile: !!state.profile.id
});

export default connect(mapStateToProps)(ProfileRoute);