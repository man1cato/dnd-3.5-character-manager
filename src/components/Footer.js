import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => (
  <footer className="container grid grid--footer">
    <Link to="/profile"><img className="grid--footer_img" src="images/person.svg" /></Link>
    <Link to="/stats"><img className="grid--footer_img" src="images/chart.svg" /></Link>
    <Link to="/combat"><img className="grid--footer_img" src="images/shield-with-swords.svg" /></Link>
    <Link to="/equipment"><img className="grid--footer_img" src="images/school-bag.svg" /></Link>
    <Link to="/spells"><img className="grid--footer_img" src="images/magic-wand.svg" /></Link>
    <Link to="/companion"><img className="grid--footer_img" src="images/paw-print.svg" /></Link>
  </footer>
)

export default Footer;
