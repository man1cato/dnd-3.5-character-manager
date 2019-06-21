import React from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'
import { schools, alignments } from '../utils/staticData'


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

const CreatorFormPage2 = ({
	values, 
	selectedRace, 
	jobClasses, 
	selectedJobClass, 
	handleChange, 
	handleSelect, 
	handleMultiSelect, 
	setFieldValue, 
	setFieldError,
	validateForm
}) => (
	<>
		<div className="form-group--30">
			<h4>Alignment:</h4>
			{selectedJobClass.name === "Paladin" ?
				<div>Lawful Good</div>
				:
				<Field 
					className="select" 
					name="alignment" 
					component="select" 
					onChange={(e) => {handleChange(e); handleSelect(e, setFieldValue)}}
				>
					{alignments.map((alignment, i) => (
						<option 
							value={alignment} 
							key={`alignment${i}`}
						>
							{alignment}
						</option>
					))}
				</Field>
			}
		</div>

		<div className="form-group--30">
			<h4>Job Class:</h4>
			<Field 
				className="select" 
				name="jobClass" 
				component="select" 
				onChange={(e) => {handleChange(e); handleSelect(e, setFieldValue)}}
			>
				{jobClasses.map((jobClass, i) => (
					<option 
						value={jobClass.id} 
						key={`jobClass${i}`}
					>
						{jobClass.name}
					</option>
				))}
			</Field>                                    
		</div>

		<div className="form-group--30 align-top">
			<h4>Hit Die:</h4>
			<div>{selectedJobClass.hitDie}</div>
		</div>

		<div className="form-group--30 align-top">
			<h4>Proficiencies:</h4>
			<div>{selectedJobClass.proficiencies.join(", ")}</div>
		</div>

		<div className="form-group--30 align-top">
			<h4>Choose Bonus Languages:</h4>
			<Field 
				className="multi-select" 
				name="bonusLanguages" 
				component="select" 
				multiple 
				onChange={(e) => {handleMultiSelect(e, setFieldValue)}}
			>
				{_.orderBy(selectedRace.bonusLanguages).map((language) => (
					<option 
						value={language} 
						key={language}
					>
						{language}
					</option>
				))}
			</Field>                                    
		</div>

		<div className="form-group--30">
			<h4>Deity:</h4>
			<Field 
				className="text-input" 
				name="deity" 
				placeholder="(Optional) Enter the name of a Deity" 
			/>                                  
		</div>
		
		{selectedJobClass.name === 'Wizard' && (
			<div className="form-group--30">
				<h4>School:</h4>
				<Field 
					className="select" 
					name="school" 
					component="select" 
					onChange={(e) => {handleChange(e); handleSelect(e, setFieldValue, setFieldError)}}
				>
					{schools.map((school, i) => (
						<option 
							value={school} 
							key={`school${i}`}
						>
							{school}
						</option>
					))}
				</Field>
			</div>
		)}

		{selectedJobClass.name === 'Wizard' && values.school !== 'Universal' && (
			<>
				<div className="form-group--30 align-top">
					<h4>Choose Prohibited School(s):</h4>
					<Field 
						className="multi-select"
						name="prohibitedSchools" 
						component="select" 
						multiple 
						validate={validateProhibitedSchools(values.school)}
						onChange={(e) => {handleMultiSelect(e, setFieldValue)}}
					>
						{_.difference(schools, [values.school, 'Universal', 'Divination']).map((school, i) => (
							<option 
								value={school} 
								key={`prohibited${i}`}
							>
								{school}
							</option>
						))}
					</Field>
				</div>
				<ErrorMessage className="form__error" name="prohibitedSchools" component="div"/>
			</>
		)}
	</>
)


export default CreatorFormPage2
