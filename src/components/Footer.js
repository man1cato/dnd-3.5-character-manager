import React from 'react';
import {Link} from 'react-router-dom';
import SVGInline from "react-svg-inline";

import profileSVG from "../../public/images/profile.svg";
import statsSVG from "../../public/images/stats.svg";
import combatSVG from "../../public/images/combat.svg";
import equipmentSVG from "../../public/images/equipment.svg";
import spellbookSVG from "../../public/images/spellbook.svg";
import companionSVG from "../../public/images/companion.svg";

const svgs = {
  profile: profileSVG,
  stats: statsSVG,
  combat: combatSVG,
  equipment: equipmentSVG,
  spellbook: spellbookSVG,
  companion: companionSVG
}

const iconWrapper = (page) => (
  <Link to={`/${page}`} className="footer--navbar__icon" key={page}>
    <SVGInline svg={svgs[page]} cleanup={true} height="100%" width="100%" fill="white" />
  </Link>
)

const Footer = () => (
  <footer className="bg-primary">
    <div className="footer--navbar">
      {Object.keys(svgs).map((svg) => iconWrapper(svg))}    
    </div>
  </footer>
)

export default Footer;