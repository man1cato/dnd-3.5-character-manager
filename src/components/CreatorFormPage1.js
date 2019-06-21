import React from 'react';
import { Field, ErrorMessage } from 'formik';

import SpecialAbilities from './SpecialAbilities';


const CreatorFormPage1 = ({
	races, 
	jobClasses, 
	selectedRace, 
	handleChange, 
	handleSelect, 
	setFieldValue
}) => (
	<div>
		<div className="form-group--35">
			<h4>Name:</h4>
			<Field className="text-input" name="name" />
		</div>
		<ErrorMessage className="form__error" name="name" component="div"/>
		
		<div className="form-group--35">
			<h4>Gender:</h4>
			<Field className="select" name="gender" component="select" onChange={(e) => {handleChange(e); handleSelect(e)}}>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="Non-Binary">Non-Binary</option>
			</Field>                                    
		</div>

		<div className="form-group--35">
			<h4>Age:</h4>
			<div className="input-group">
				<Field className="text-input" name="age" />
				<div> yrs</div>
			</div>
		</div>
		<ErrorMessage className="form__error" name="age" component="div"/>

		<div className="form-group--35">
			<h4>Height:</h4>
			<div className="input-group">
				<Field className="text-input" name="heightFt" />
				<div>ft</div>
				<Field className="text-input" name="heightIn" />
				<div>in</div>
			</div>
		</div>
		<ErrorMessage className="form__error" name="heightFt" component="div"/>
		<ErrorMessage className="form__error" name="heightIn" component="div"/>

		<div className="form-group--35">
			<h4>Weight:</h4>
			<div className="input-group">
				<Field className="text-input" name="weight" />
				<div>lbs</div>
			</div>
		</div>
		<ErrorMessage className="form__error" name="weight" component="div"/>

		<div className="divider"></div>

		<div className="form-group--35">
			<h4>Race:</h4>
			<Field className="select" name="race" component="select" onChange={(e) => {handleChange(e); handleSelect(e, setFieldValue)}}>
				{races.map((race, i) => (
					<option 
						value={race.id} 
						key={`race${i}`}
					>
						{race.name}
					</option>
				))}
			</Field>                                    
		</div>

		<div className="form-group--35  align-bottom">
			<h4>Favored Class:</h4>
			<div>
				{selectedRace.favoredClass ? 
					jobClasses.find((jobClass) => selectedRace.favoredClass === jobClass.id).name
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
			<div>
				{Object.entries(selectedRace.abilityMods).filter((mod) => mod[1] !== 0).length > 0 ?
					Object.entries(selectedRace.abilityMods).filter((mod) => mod[1] !== 0).map((mod) => (
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
		
	</div>
)


export default CreatorFormPage1