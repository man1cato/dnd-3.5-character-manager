import React from 'react'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'
import { Link } from 'react-router-dom'
import SVGInline from 'react-svg-inline'

import plusSVG from "../../public/images/plus.svg"
import swapSVG from "../../public/images/swap.svg"


export const Header = (props) => (
	<header>
		<div className="container header__content">
			<h2 className="header__title">{props.pageTitle}</h2>
			<div className="header__nav">
				<Link to="/create" className="header__icon">
					<SVGInline svg={plusSVG} cleanup={true} height="100%" width="100%" fill="white" />
				</Link>
				<Link to="/select" className="header__icon">
					<SVGInline svg={swapSVG} cleanup={true} height="100%" width="100%" fill="white" />
				</Link>
				<button onClick={props.startLogout}>Logout</button>
			</div>
		</div>
	</header>
)

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)
