import React from 'react'
import { connect } from 'react-redux'
import { startLogout } from '../../store/actions/auth'
import { NavLink } from 'react-router-dom'

import './Header.scss'


export const Header = ({pageTitle, startLogout, hasProfiles}) => (
	<header>
		<div className="container header__content">
			<h2 className="header__title">{pageTitle}</h2>
			<div className="header__nav">
				<NavLink to="/create" className="header__button">
					<ion-icon name="add-circle-outline" size="large" />
				</NavLink>
				<NavLink to="/select" className="header__button" hidden={!hasProfiles}>
					<ion-icon name="swap" size="large" />
				</NavLink>
				<button className="header__button" onClick={startLogout}>
					<ion-icon name="log-out" size="large"/>
				</button>
			</div>
		</div>
	</header>
)

const mapStateToProps = (state) => ({
	hasProfiles: !!state.profiles && state.profiles.length > 1
})

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
