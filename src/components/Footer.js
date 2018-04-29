import React from 'react';
import {Link} from 'react-router-dom';
import SVGInline from "react-svg-inline";

import profileSVG from "../../public/images/person.svg";
import statsSVG from "../../public/images/chart.svg";
import combatSVG from "../../public/images/shield-with-swords.svg";
import equipmentSVG from "../../public/images/school-bag.svg";
import spellsSVG from "../../public/images/magic-wand.svg";
import companionSVG from "../../public/images/paw-print.svg";

const Footer = () => (
  <footer className="container container--footer grid grid--footer">
    <Link to="/profile" className="grid--footer__icon"><SVGInline svg={profileSVG} cleanup={true} /></Link>
    <Link to="/profile" className="grid--footer__icon"><SVGInline svg={statsSVG} cleanup={true} /></Link>
    <Link to="/profile" className="grid--footer__icon"><SVGInline svg={combatSVG} cleanup={true} /></Link>
    <Link to="/profile" className="grid--footer__icon"><SVGInline svg={equipmentSVG} cleanup={true} /></Link>
    <Link to="/profile" className="grid--footer__icon"><SVGInline svg={spellsSVG} cleanup={true} /></Link>
    <Link to="/profile" className="grid--footer__icon"><SVGInline svg={companionSVG} cleanup={true} /></Link>
  </footer>
)

export default Footer;