import React from 'react'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'
import { NavLink } from 'react-router-dom'
import SVGInline from 'react-svg-inline'

import plusSVG from "../../public/images/plus.svg"
import swapSVG from "../../public/images/swap.svg"


export const Header = ({pageTitle, startLogout}) => (
	<header>
		<div className="container header__content">
			<h2 className="header__title">{pageTitle}</h2>
			<div className="header__nav">
				<NavLink to="/create" className="header__icon">
					<SVGInline svg={plusSVG} cleanup={true} height="100%" width="100%" fill="white" />
				</NavLink>
				<NavLink to="/select" className="header__icon">
					<SVGInline svg={swapSVG} cleanup={true} height="100%" width="100%" fill="white" />
				</NavLink>
				<button onClick={startLogout}>Logout</button>
			</div>
		</div>
	</header>
)

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)
