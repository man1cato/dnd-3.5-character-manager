import React from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper';
import {startEditProfile} from '../actions/profile';

import Header from './Header';
import Footer from './Footer';
import Abilities from './Abilities';
import SkillSet from './SkillSet';


export class StatsPage extends React.Component {
	state = {
		abilities: this.props.abilities
	}

	handleChange = (e) => {
		const ability = e.target.id;
		const value = Number(e.target.value);
		const tempScore = value === 0 || isNaN(value) ? "" : value;
		const tempMod = tempScore === "" ? "" : Math.floor(tempScore/2 - 5);
		this.setState((prevState) => {
			return {
			abilities: update(prevState.abilities, {
				[ability]: {
					tempScore: {$set: tempScore},
					tempMod: {$set: tempMod}
				}
			})
			}
		},() => {
			this.props.startEditProfile(this.props.id, {
				abilities: this.state.abilities
			})
		})
	}  

	render () {
		return (
			<div className="layout">
			<Header pageTitle="Character Stats" />
			<div className="container container--body">

				<div className="row">
					<h3>Level {this.props.level}</h3>
					<span>XP: {this.props.xp}</span>
				</div>

				<div className="row">
					<span>Hit Die: {this.props.hd}</span>
					<span>To next level: {this.props.toNextLevel}</span>
				</div>

				<Abilities
					abilities={this.state.abilities}
					handleChange={this.handleChange}
				/>

				<SkillSet 
					skillSet={this.props.skillSet}
				/>

			</div>
			<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	id: state.profile.id,
	hd: state.profile.hd,
	level: state.profile.level,
	xp: state.profile.xp,
	toNextLevel: state.profile.toNextLevel,
	abilities: state.profile.abilities,
	skillSet: state.profile.skillSet
})

const mapDispatchToProps = (dispatch, props) => ({ 
  	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
