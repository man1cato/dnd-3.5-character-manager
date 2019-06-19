import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import { startEditProfile } from '../actions/profile'

import Header from './Header'
import Footer from './Footer'
import Abilities from './Abilities'
import SkillSet from './SkillSet'


export class StatsPage extends React.Component {
	state = {
		abilities: this.props.abilities
	}

	handleChange = (e) => {
		const ability = e.target.id
		const value = Number(e.target.value)
		const tempScore = value === 0 || isNaN(value) ? "" : value
		const tempMod = tempScore === "" ? "" : Math.floor(tempScore/2 - 5)
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
						<span>Hit Die: {this.props.hitDie}</span>
						<span>To next level: {this.props.nextLevelXp - this.props.xp}</span>
					</div>

					<div className="section">
						<Abilities
							abilities={this.state.abilities}
							handleChange={this.handleChange}
						/>
					</div>
					
					<SkillSet 
						skillSet={this.props.skillSet}
					/>

				</div>
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = ({profile, jobClasses}) => {
	const level = profile.level
	const jobClass = jobClasses[profile.jobClass]
	return {
		id: profile.id,
		level,
		xp: profile.xp,
		abilities: profile.abilities,
		skillSet: profile.skillSet,
		hitDie: jobClass.hitDie,
		nextLevelXp: jobClass.levels[level + 1].xp
	}
}

const mapDispatchToProps = (dispatch, props) => ({ 
  	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage)
