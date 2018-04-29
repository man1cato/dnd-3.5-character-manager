import React from 'react';
import {Link} from 'react-router-dom';
import SVGInline from "react-svg-inline";

import profileSVG from "../../public/images/profile.svg";
import statsSVG from "../../public/images/stats.svg";
import combatSVG from "../../public/images/combat.svg";
import equipmentSVG from "../../public/images/equipment.svg";
import spellsSVG from "../../public/images/spells.svg";
import companionSVG from "../../public/images/companion.svg";

const svgs = {
  profile: profileSVG,
  stats: statsSVG,
  combat: combatSVG,
  equipment: equipmentSVG,
  spells: spellsSVG,
  companion: companionSVG
}

const iconWrapper = (page) => (
  <Link to={`/${page}`} className="grid--footer__icon" key={page}>
    <SVGInline svg={svgs[page]} cleanup={true} height="100%" width="100%" fill="white" />
  </Link>
)

const Footer = () => (
  <footer className="container container--footer grid grid--footer">
    {Object.keys(svgs).map((svg) => iconWrapper(svg))}    
  </footer>
)

export default Footer;