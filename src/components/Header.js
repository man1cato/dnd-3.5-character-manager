import React from 'react'
import { connect } from 'react-redux'
import { startLogout } from '../store/actions/auth'
import { NavLink } from 'react-router-dom'
import SVGInline from 'react-svg-inline'

import plusSVG from "../../public/images/plus.svg"
import swapSVG from "../../public/images/swap.svg"

const HeaderIcon = ({svgFile}) => (
	<SVGInline svg={svgFile} cleanup={true} height="100%" width="100%" fill="white" />
)

export const Header = ({pageTitle, startLogout, hasProfiles}) => (
	<header>
		<div className="container header__content">
			<h2 className="header__title">{pageTitle}</h2>
			<div className="header__nav">
				<NavLink to="/create" className="header__icon">
					<HeaderIcon svgFile={plusSVG} />
				</NavLink>
				<NavLink to="/select" className="header__icon" hidden={!hasProfiles}>
					<HeaderIcon svgFile={swapSVG} />
				</NavLink>
				<button onClick={startLogout}>Logout</button>
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
