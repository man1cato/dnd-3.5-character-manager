import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'


export const ProfileRoute = ({
   isAuthenticated,
   hasProfile,
   hasProfiles,
	component: Component,
	pageTitle,
   ...rest
}) => (
   <Route {...rest} component={(props) => (
		isAuthenticated ? (
			hasProfile ? (
				<>
					<Header pageTitle={pageTitle}/>
					<Component {...props} />
					<Footer />
				</>
			) : (
				hasProfiles ? (
					<Redirect to="/select" />    
				) : (
					<Redirect to="/create" />
				)
			)
		) : (
			<Redirect to="/" />
		)
   )} />
)

const mapStateToProps = (state) => ({
   isAuthenticated: !!state.auth && !!state.auth.uid,
   hasProfile: !!state.profile && !!state.profile.id,
   hasProfiles: !!state.profiles && state.profiles.length > 0
})

export default connect(mapStateToProps)(ProfileRoute)