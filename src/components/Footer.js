import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Footer = () => (
  <footer className="grid--footer">
    <div>Profile</div>
    <div>Stats</div>
    <div>Combat</div>
    <div>Equipment</div>
    <div>Spells</div>
    <div>Companion</div>
  </footer>
)
