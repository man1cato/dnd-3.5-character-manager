import React, { useEffect }  from 'react'
import { Field, ErrorMessage } from 'formik'
import _ from 'lodash'

import SpecialAbilities from './SpecialAbilities'
import { apiObjectToArray } from '../utils/utils'


const CreatorFormIdentity = ({
	selectedRace, 
	setSelectedRace,
	races, 
	jobClasses,
	handleChange,
	setTouched
}) => {
	useEffect(() => {
		setTouched({ remainingSkillPoints: true, feats: true, equipment: true })
	},[])

	return (
		<>
			<div className="form-group--35">
				<h4>Name:</h4>
				<div>
					<Field className="text-input" name="name" />
					<ErrorMessage className="form-group--error" name="name" component="div"/>
				</div>
			</div>
			
			<div className="form-group--35">
				<h4>Gender:</h4>
				<Field className="select" name="gender" component="select" >
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Non-Binary">Non-Binary</option>
				</Field>                                    
			</div>

			<div className="form-group--35">
				<h4>Age:</h4>
				<div>
					<div className="input-group">
						<Field className="text-input" name="age" type="number" />
						<div> yrs</div>
					</div>
					<ErrorMessage className="form-group--error" name="age" component="div"/>
				</div>
			</div>

			<div className="form-group--35">
				<h4>Height:</h4>
				<div>
					<div className="input-group">
						<Field className="text-input" name="height.ft" type="number" />
						<div>ft</div>
						<Field className="text-input" name="height.in"  type="number" />
						<div>in</div>
					</div>
					<div className="input-group">
						<ErrorMessage className="form-group--error" name="height.ft" component="div"/>
						<ErrorMessage className="form-group--error" name="height.in" component="div"/>
					</div>
				</div>
			</div>

			<div className="form-group--35">
				<h4>Weight:</h4>
				<div>
					<div className="input-group">
						<Field className="text-input" name="weight" type="number" />
						<div>lbs</div>
					</div>
					<ErrorMessage className="form-group--error" name="weight" component="div"/>
				</div>
			</div>

			<div className="divider"></div>

			<div className="form-group--35">
				<h4>Race:</h4>
				<Field 
					className="select" 
					name="race" 
					component="select" 
					onChange={(e) => {
						setSelectedRace(races[e.target.value])
						handleChange(e)
					}}
				>
					{_.map(apiObjectToArray(races), (race, i) => (
						<option 
							value={race.id} 
							key={`race${i}`}
						>
							{race.name}
						</option>
					))}
				</Field>                                    
			</div>

			<div className="form-group--35 align-bottom">
				<h4>Favored Class:</h4>
				<div>
					{selectedRace.favoredClass ? 
						jobClasses[selectedRace.favoredClass].name
						:
						'Any'
					}
				</div>
			</div>

			<div className="form-group--35">
				<h4>Size:</h4>                                 
				<div>{selectedRace.size}</div>
			</div> 

			<div className="form-group--35">
				<h4>Speed:</h4>                                 
				<div>{selectedRace.speed}</div>
			</div> 

			<div className="form-group--35 align-bottom">
				<h4>Racial Modifiers:</h4>     
				<div className="input-group flex-wrap">
					{_.filter(selectedRace.abilityMods, (mod) => mod !== 0).length > 0 ?
						_.filter(_.toPairs(selectedRace.abilityMods), (mod) => mod[1] !== 0).map((mod) => (
							<div key={mod}>{mod[0].toUpperCase()}: {mod[1]}</div>
						))
						:
						<div>None</div>
					}            
				</div>
			</div>

			<div className="form-group--35 align-bottom">
				<h4>Default Language(s):</h4>
				<div>{selectedRace.defaultLanguages.join(', ')}</div>
			</div>

			<div className="form-group--35 align-top">
				<h4>Bonus Languages:</h4>
				<div>
					{selectedRace.bonusLanguages.join(', ')}
				</div>                                    
			</div>

			<div className="form-group--35 align-top">
				<h4>Racial Bonuses:</h4>
				{selectedRace.racialBonuses ? 
					<ul className="form-group__list">
						{selectedRace.racialBonuses.map((item, i) => (
							<li key={`racialBonus${i}`}>{item}</li>
						))}
					</ul>
					:
					<p>None</p>
				}
			</div>

			<div className="form-group--35 align-top">
				<h4>Special Abilities:</h4>
				<div>
					{selectedRace.specialAbilities ?
						<SpecialAbilities specialAbilityIds={selectedRace.specialAbilities} />
						:
						"None"
					}
				</div>
			</div>        
			
		</>
	)
}


export default CreatorFormIdentity