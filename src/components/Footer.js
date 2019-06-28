import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SVGInline from 'react-svg-inline'

import profileSVG from "../../public/images/profile.svg"
import statsSVG from "../../public/images/stats.svg"
import combatSVG from "../../public/images/combat.svg"
import equipmentSVG from "../../public/images/equipment.svg"
import spellbookSVG from "../../public/images/spellbook.svg"
import companionSVG from "../../public/images/companion.svg"


const FooterIcon = ({svgFile}) => (
	<SVGInline svg={svgFile} cleanup={true} height="100%" width="100%" fill="white" />
)

export const Footer = ({profile}) => (
	<footer className="footer--navbar">
		<div className="container footer--navbar__content" >
			<Link to="/profile" >
				<FooterIcon svgFile={profileSVG} />
			</Link>

			<Link to={profile.ac ? "/stats" : "/underconstruction"} >
				<FooterIcon svgFile={statsSVG} />
			</Link>

			<Link to={profile.hp ? "/combat" : "/underconstruction"} >
				<FooterIcon svgFile={combatSVG} />
			</Link>

			<Link to={profile.equipment ? "/equipment" : "/underconstruction"} >
				<FooterIcon svgFile={equipmentSVG} />
			</Link>

			
			{profile.spellbook && 
				<Link to="/spellbook" >
					<FooterIcon svgFile={spellbookSVG} />
				</Link>
			}

			{profile.companion && 
				<Link to="/companion" >
					<FooterIcon svgFile={companionSVG} />
				</Link>
			}
		</div>
	</footer>
)

const mapStateToProps = (state) => ({
	profile: state.profile
})

export default connect(mapStateToProps)(Footer)