import React from 'react'
import { connect } from 'react-redux'
import { startEditProfile } from '../../store/actions/profile'

import Abilities from '../../components/Abilities/Abilities'
import SkillSet from '../../components/SkillSet/SkillSet'
import './StatsPage.scss'


export const StatsPage = ({ profile, jobClasses, startEditProfile }) => {
	const { xp, level } = profile
	const jobClass = jobClasses[profile.jobClass]
	const nextLevelXp = jobClass.levels[level + 1].xp

	const handleUpdate = (updates) => {
		startEditProfile(profile.id, updates)
	}

	return (
		<div className="container--body">
			<div className="section">
				<div className="StatsPage__row">
					<h3>Level {profile.level}</h3>
					<span>XP: {xp}</span>
				</div>

				<div className="StatsPage__row">
					<span>Hit Die: {jobClass.hitDie}</span>
					<span>To next level: {nextLevelXp - xp}</span>
				</div>
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
	)
}

const mapStateToProps = state => ({
	profile: state.profile,
	jobClasses: state.jobClasses
})

const mapDispatchToProps = dispatch => ({ 
  	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage)
