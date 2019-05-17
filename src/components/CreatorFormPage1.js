import React from 'react';
import { Field, ErrorMessage } from 'formik';

import SpecialAbilities from './SpecialAbilities';


const CreatorFormPage1 = ({races, jobClasses, selectedRace, handleChange, handleSelect, setFieldValue}) => (
	<div>
		<div className="form__group">
			<div className="form__content--flex">
				<h4>Name:</h4>
				<Field name="name" />
			</div>
			<ErrorMessage name="name" component="div"/>
		</div>
		
		<div className="form__group form__content--flex">
			<h4>Gender:</h4>
			<Field name="gender" component="select" onChange={(e) => {handleChange(e); handleSelect(e)}}>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="Non-Binary">Non-Binary</option>
			</Field>                                    
		</div>

		<div className="form__group">
			<div className="form__content--inline">
				<h4>Age:</h4>
				<div>
					<Field name="age" />
					<div> yrs</div>
				</div>
			</div>
			<ErrorMessage name="age" component="div"/>
		</div>

		<div className="form__group">
			<div className="form__content--inline">
				<h4>Height:</h4>
				<div>
					<Field name="heightFt" />
					<div>ft</div>
					<Field name="heightIn" />
					<div>in</div>
				</div>
			</div>
			<ErrorMessage name="heightFt" component="div"/>
			<ErrorMessage name="heightIn" component="div"/>
		</div>

		<div className="form__group">
			<div className="form__content--inline">
				<h4>Weight:</h4>
				<div>
					<Field name="weight" />
					<div>lbs</div>
				</div>
			</div>
			<ErrorMessage name="weight" component="div"/>
		</div>

		<div className="divider"></div>

		<div className="form__group form__content--flex">
			<h4>Race:</h4>
			<Field name="race" component="select" onChange={(e) => {handleChange(e); handleSelect(e, setFieldValue)}}>
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

		<div className="form__group form__content--flex">
			<h4>Favored Class:</h4>
			<div>
				{selectedRace.favoredClass ? 
					jobClasses.find((jobClass) => selectedRace.favoredClass === jobClass.id).name
					:
					'Any'
				}
			</div>
		</div>

		<div className="form__group form__content--flex">
			<h4>Size:</h4>                                 
			<div>{selectedRace.size}</div>
		</div> 

		<div className="form__group form__content--flex">
			<h4>Speed:</h4>                                 
			<div>{selectedRace.speed}</div>
		</div> 

		<div className="form__group form__content--flex">
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

		<div className="form__group form__content--flex">
			<h4>Default Language(s):</h4>
			<div>{selectedRace.defaultLanguages.join(', ')}</div>
		</div>

		<div className="form__group form__content--flex">
			<h4>Bonus Languages:</h4>
			<div>
				{selectedRace.bonusLanguages.join(', ')}
			</div>                                    
		</div>

		<div className="form__group form__content">
			<h4>Racial Bonuses:</h4>
			{selectedRace.racialBonuses ? 
				<ul>
					{selectedRace.racialBonuses.map((item, i) => (
						<li key={`racialBonus${i}`}>{item}</li>
					))}
				</ul>
				:
				<p>None</p>
			}
		</div>

		<div className="form__group form__content--flex">
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
);


export default CreatorFormPage1;