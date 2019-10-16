import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import PhysicalStats from '../../components/PhysicalStats/PhysicalStats'
import AttackBonuses from '../../components/AttackBonuses/AttackBonuses'
import Saves from '../../components/Saves/Saves'
import Weapons from '../../components/Weapons/Weapons'
import PreparedSpells from '../../components/PreparedSpells/PreparedSpells'
import { startEditProfile } from '../../store/actions/profile'
import { calcAbilityMod } from '../../utils/utils'


export const CombatPage = ({ profile, races, jobClasses, spells, startEditProfile }) => {
	const jobClassLevel = jobClasses[profile.jobClass].levels[profile.level]
	const race = races[profile.race]
	const handleUpdate = updates => { 
		startEditProfile(profile.id, updates) 
	}

	return (
		<div className="container--body">
			<div className="section">
				<h3 className="section__title">Physical Stats</h3>
				<PhysicalStats
					hp={profile.hp}
					ac={profile.ac}
					initBase={
						!!profile.abilities.dex.tempScore ? 
						calcAbilityMod(profile.abilities.dex.tempScore) : 
						calcAbilityMod(profile.abilities.dex.score)
					}
					initMod={profile.initiativeMod}
					speed={race.speed}
					handleUpdate={handleUpdate}							
				/>
			</div>

			<div className="section">
				<h3 className="section__title">Saving Throws</h3>
				<Saves
					saveMods={profile.saveMods}
					saveBases={jobClassLevel.saves}
					handleUpdate={handleUpdate}
				/>
			</div>

			<div className="section">       
				<h3 className="section__title">Attack Bonuses</h3>
				<AttackBonuses 
					attackBonuses={profile.attackBonuses}
					handleUpdate={handleUpdate}
				/>
			</div>

			{profile.equipped && ( 
				<div className="section">
					<h3 className="section__title">Equipped Weapons</h3>
					<Weapons 
						equippedWeapons={profile.equipped.weapons}
						attackBonuses={profile.attackBonuses}
					/>
				</div>
			)}

			{profile.spellbook && (
				<div className="section">
					<h3 className="section__title">Prepared Spells</h3>
					<PreparedSpells 
						spellbook={profile.spellbook}
						spells={spells}
						handleUpdate={handleUpdate}
					/>
				</div>
			)}

		</div>
	)
}

const mapStateToProps = state => ({
	profile: state.profile,
	races: state.races,
	jobClasses: state.jobClasses,
	spells: state.spells
})

const mapDispatchToProps = dispatch => ({
  	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})


export default connect(mapStateToProps, mapDispatchToProps)(CombatPage)