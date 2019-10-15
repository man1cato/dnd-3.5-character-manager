import React, { useEffect }  from 'react'
import { Field, ErrorMessage } from 'formik'
import _ from 'lodash'

import SpecialAbilities from '../../../components/SpecialAbilities/SpecialAbilities'
import { apiObjectToArray } from '../../../utils/utils'
import './CreatorFormIdentity.scss'


const CreatorFormIdentity = ({
	values,
	races, 
	jobClasses,
	setTouched,
	setFieldValue
}) => {
	const { race } = values 
	useEffect(() => {
		setTouched({ remainingSkillPoints: true, feats: true, equipment: true, remainingGold: true })
	},[])

	return (
		<div className="container--body">		
			<div className="CreatorFormIdentity__group">
				<h4>Name:</h4>
				<div>
					<Field className="text-input" name="name" />
					<ErrorMessage className="CreatorForm__error" name="name" component="div"/>
				</div>
			</div>
			
			<div className="CreatorFormIdentity__group">
				<h4>Gender:</h4>
				<Field className="select" name="gender" component="select" >
					<option value="Male">Male</option>
					<option value="Female">Female</option>
					<option value="Non-Binary">Non-Binary</option>
				</Field>                                    
			</div>

			<div className="CreatorFormIdentity__group">
				<h4>Age:</h4>
				<div>
					<div className="CreatorForm__input-group">
						<Field className="text-input" name="age" type="number" />
						<div> yrs</div>
					</div>
					<ErrorMessage className="CreatorForm__error" name="age" component="div"/>
				</div>
			</div>

			<div className="CreatorFormIdentity__group">
				<h4>Height:</h4>
				<div>
					<div className="CreatorForm__input-group">
						<Field className="text-input" name="height.ft" type="number" />
						<div>ft</div>
						<Field className="text-input" name="height.in"  type="number" />
						<div>in</div>
					</div>
					<div className="CreatorForm__input-group">
						<ErrorMessage className="CreatorForm__error" name="height.ft" component="div"/>
						<ErrorMessage className="CreatorForm__error" name="height.in" component="div"/>
					</div>
				</div>
			</div>

			<div className="CreatorFormIdentity__group">
				<h4>Weight:</h4>
				<div>
					<div className="CreatorForm__input-group">
						<Field className="text-input" name="weight" type="number" />
						<div>lbs</div>
					</div>
					<ErrorMessage className="CreatorForm__error" name="weight" component="div"/>
				</div>
			</div>

			<div className="divider"></div>

			<div className="CreatorFormIdentity__group">
				<h4>Race:</h4>
				<select 
					className="select" 
					defaultValue={_.findKey(races, race)}
					onChange={(e) => setFieldValue('race', races[e.target.value])}
				>
					{_.map(apiObjectToArray(races), race => (
						<option 
							value={race.id} 
							key={race.id}
						>
							{race.name}
						</option>
					))}
				</select>                                    
			</div>

			<div className="CreatorFormIdentity__group align-bottom">
				<h4>Favored Class:</h4>
				<div>
					{race.favoredClass ? jobClasses[race.favoredClass].name : 'Any'}
				</div>
			</div>

			<div className="CreatorFormIdentity__group">
				<h4>Size:</h4>                                 
				<div>{race.size}</div>
			</div> 

			<div className="CreatorFormIdentity__group">
				<h4>Speed:</h4>                                 
				<div>{race.speed}</div>
			</div> 

			<div className="CreatorFormIdentity__group--bottom">
				<h4>Racial Modifiers:</h4>     
				<div className="CreatorForm__input-group">
					{_.filter(race.abilityMods, mod => mod !== 0).length > 0 ?
						_.filter(_.toPairs(race.abilityMods), mod => mod[1] !== 0).map(mod => (
							<div key={mod}>{mod[0].toUpperCase()}: {mod[1]}</div>
						))
						:
						<div>None</div>
					}            
				</div>
			</div>

			<div className="CreatorFormIdentity__group--bottom">
				<h4>Default Language(s):</h4>
				<div>{race.defaultLanguages.join(', ')}</div>
			</div>

			<div className="CreatorFormIdentity__group--top">
				<h4>Bonus Languages:</h4>
				<div>
					{race.bonusLanguages.join(', ')}
				</div>                                    
			</div>

			<div className="CreatorFormIdentity__group--top">
				<h4>Racial Bonuses:</h4>
				{race.racialBonuses ? 
					<ul className="CreatorFormIdentity__list">
						{race.racialBonuses.map((item, i) => (
							<li key={`racialBonus${i}`}>{item}</li>
						))}
					</ul>
					:
					<p>None</p>
				}
			</div>

			<div className="CreatorFormIdentity__group--top">
				<h4>Special Abilities:</h4>
				<div>
					{race.specialAbilities ?
						<SpecialAbilities specialAbilityIds={race.specialAbilities} />
						:
						"None"
					}
				</div>
			</div>        
			
		</div>
	)
}


export default CreatorFormIdentity