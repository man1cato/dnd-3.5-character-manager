import React from 'react'
import { connect } from 'react-redux'

import Abilities from '../../components/Abilities/Abilities'
import Feats from '../../components/Feats/Feats'
import SpecialAbilities from '../../components/SpecialAbilities/SpecialAbilities'
import SkillSet from '../../components/SkillSet/SkillSet'
import PhysicalStats from '../../components/PhysicalStats/PhysicalStats'
import { startEditProfile } from '../../store/actions/profile'
import { calcAbilityMod } from '../../utils/utils'


export const CompanionPage = ({ id, companion, startEditProfile }) => {
	const handleUpdate = (updates) => {
		startEditProfile(id, {
			companion: {
				...companion,
				...updates
			}
		})
	}

	return (
		<div className="container--body">
			<div className="section grid--companion">
				<h3>{companion.name}</h3>
				<div>{companion.type}</div>

				<h4 className="grid__col1">Special Abilities</h4>
				<SpecialAbilities 
					specialAbilityIds={companion.specialAbilities} 
				/>                    
				
				<h4 className="grid__col1">Feats</h4>
				<Feats 
					featIds={companion.feats} 
				/>
			</div>

			<div className="section">
				<h3 className="section__title">Abilities</h3>
				<Abilities
					abilities={companion.abilities}
					handleUpdate={handleUpdate}
				/>
			</div>

			<div className="section">
				<h3 className="section__title">Skills</h3>
				<SkillSet 
					skillSet={companion.skillSet}                        
				/>
			</div>

			<h3 className="section__title">Combat</h3>
			<PhysicalStats
				hp={companion.hp}
				ac={companion.ac}
				initBase={
					!!companion.abilities.dex.tempScore ?
					calcAbilityMod(companion.abilities.dex.tempScore) :
					calcAbilityMod(companion.abilities.dex.score)
				}
				initMod={companion.initMod}
				speed={companion.speed}
				handleUpdate={handleUpdate}							
			/>

			<div className="grid--combat">
				<div className="row__title">Attack</div>
				<div className="row--left">            
					{companion.attack}
				</div>
			</div>

		</div>
	)
	
}

const mapStateToProps = (state) => ({
	id: state.profile.id,
	companion: state.profile.companion
})

const mapDispatchToProps = (dispatch) => ({
	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})


export default connect(mapStateToProps, mapDispatchToProps)(CompanionPage)