import React from 'react'
import { connect } from 'react-redux'
import { startEditProfile } from '../actions/profile'

import Header from './Header'
import Footer from './Footer'
import Abilities from './Abilities'
import SkillSet from './SkillSet'


export const StatsPage = ({ profile, jobClasses, startEditProfile }) => {
	const { xp, level } = profile
	const jobClass = jobClasses[profile.jobClass]
	const nextLevelXp = jobClass.levels[level + 1].xp

	const handleUpdate = (updates) => {
		startEditProfile(profile.id, updates)
	}

	return (
		<div >
			<Header pageTitle="Character Stats" />
			<div className="container container--body">

				<div className="row">
					<h3>Level {profile.level}</h3>
					<span>XP: {xp}</span>
				</div>

				<div className="row">
					<span>Hit Die: {profile.hitDie}</span>
					<span>To next level: {nextLevelXp - xp}</span>
				</div>

				<div className="section">
					<Abilities
						abilities={profile.abilities}
						handleUpdate={handleUpdate}
					/>
				</div>
				
				<SkillSet 
					skillSet={profile.skillSet}
				/>

			</div>
			<Footer />
		</div>
	)
}

const mapStateToProps = (state) => ({
	profile: state.profile,
	jobClasses: state.jobClasses
})

const mapDispatchToProps = (dispatch) => ({ 
  	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage)
