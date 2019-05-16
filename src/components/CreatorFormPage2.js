import React from 'react';
import _ from 'lodash';
import { Field, ErrorMessage } from 'formik';

const validateProhibitedSchools = (selectedSchool) => (value) => {
	let error;
	if (selectedSchool === 'Divination') {
		if (value.length !== 1) {
			error = 'You must select one school whose magic use will be prohibited';
		}
	} else {
		if (selectedSchool !== 'Universal' && value.length !== 2) {
			error = 'You must select two schools whose magic use will be prohibited';
		}
	}
	return error;
}

const CreatorFormPage2 = ({values, selectedRace, classes, selectedClass, schools, handleChange, handleSelect, handleMultiSelect, setFieldValue, setFieldError}) => (
	<div>
		<div className="form__group form__content--flex">
			<h4>Choose Class:</h4>
			<Field name="jobClass" component="select" onChange={(e) => {handleChange(e); handleSelect(e)}}>
				{classes.map((jobClass) => (
					<option 
						value={jobClass.id} 
						key={jobClass.id}
					>
						{jobClass.name}
					</option>
				))}
			</Field>                                    
		</div>

		<div className="form__group form__content--flex">
			<h4>Hit Die:</h4>
			<div>{selectedClass.hitDie}</div>
		</div>

		<div className="form__group form__content--flex">
			<h4>Proficiencies:</h4>
			<div>{selectedClass.proficiencies}</div>
		</div>

		<div className="form__group form__content--flex">
			<h4>Choose Bonus Languages:</h4>
			<Field name="bonusLanguages" component="select" multiple onChange={(e) => {handleMultiSelect(e, setFieldValue)}}>
				{selectedRace.bonusLanguages.map((language) => (
					<option 
						value={language} 
						key={language}
					>
						{language}
					</option>
				))}
			</Field>                                    
		</div>

		<div className="form__group form__content--flex">
			<h4>Deity:</h4>
			<Field name="deity" placeholder="(Optional) Enter the name of a Deity" />                                  
		</div>
		
		{selectedClass.name === 'Wizard' && (
			<div className="form__group form__content--flex">
				<h4>Choose School:</h4>
				<Field name="school" component="select" onChange={(e) => {handleChange(e); handleSelect(e, setFieldValue, setFieldError)}}>
					{schools.map((school) => (
						<option 
							value={school} 
							key={school}
						>
							{school}
						</option>
					))}
				</Field>
			</div>
		)}

		{values.school !== 'Universal' && (
			<div className="form__group">
				<div className="form__content--flex">
					<h4>Choose Prohibited School(s):</h4>
					<Field 
						name="prohibitedSchools" 
						component="select" 
						multiple 
						validate={validateProhibitedSchools(values.school)}
						onChange={(e) => {handleMultiSelect(e, setFieldValue)}}
					>
						{_.difference(schools, [values.school, 'Universal', 'Divination']).map((school) => (
							<option 
								value={school} 
								key={`prohibited${school}`}
							>
								{school}
							</option>
						))}
					</Field>
				</div>
				<ErrorMessage name="prohibitedSchools" component="div"/>
			</div>
		)}
	</div>
);


export default CreatorFormPage2;
