import React, { useEffect } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'

import { schools, alignments } from '../../../utils/staticData'
import { apiObjectToArray, calcStartingGold } from '../../../utils/utils'
import './CreatorFormJobClass.scss'


const validateProhibitedSchools = selectedSchool => value => {
	let error
	if (selectedSchool === 'Divination') {
		if (value.length < 1) {
			error = 'You must select one school whose magic use will be prohibited'
		}
		if (value.length > 1) {
			error = 'Select only one school whose magic use will be prohibited'
		}
	} else {
		if (selectedSchool !== 'Universal' && value.length < 2) {
			error = 'You must select two schools whose magic use will be prohibited'
		}
		if (selectedSchool !== 'Universal' && value.length > 2) {
			error = 'Select only two schools whose magic use will be prohibited'
		}
	}
	return error
}

const CreatorFormJobClass = ({
	values, 
	jobClasses, 
	handleChange, 
	handleMultiSelect, 
	setFieldValue, 
	setFieldError
}) => {
	const { race, jobClass, school } = values

	useEffect(() => {
		if (jobClass.name === 'Paladin') {
			setFieldValue('alignment', 'Lawful Good')
		} else if (jobClass.name === 'Wizard') {
			setFieldValue('school', 'Universal')
		} else {
			setFieldValue('school', null)
			setFieldValue('prohibitedSchools', [])
		}
	}, [jobClass])

	return (
		<div className="container--body">			
			<div className="CreatorFormJobClass__group">
				<h4>Job Class:</h4>
				<select
					className="select"
					defaultValue={_.findKey(jobClasses, jobClass)}
					onChange={(e) => {
						setFieldValue('jobClass', jobClasses[e.target.value])
						setFieldValue('startingGold', 0)
					}}
				>
					{_.map(apiObjectToArray(jobClasses), jobClass => (
						<option
							key={jobClass.id}
							value={jobClass.id}
						>
							{jobClass.name}
						</option>
					))}
				</select>
			</div>

			<div className="CreatorFormJobClass__group">
				<h4>Alignment:</h4>
				{jobClass.name === "Paladin" ?
					<div>Lawful Good</div>
					:
					<Field 
						className="select" 
						name="alignment" 
						component="select" 
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

			<div className="CreatorFormJobClass__group--top">
				<h4>Hit Die:</h4>
				<div>{jobClass.hitDie}</div>
			</div>

			<div className="CreatorFormJobClass__group">
				<h4>Starting Gold:</h4>
				<div className="CreatorForm__input-group">
					<input
						className="number-input"
						type="number"
						value={values.startingGold}
						onChange={(e) => setFieldValue('startingGold', Number(e.target.value))}
					/>
					<div> gp</div>
					<button
						className="button"
						type="button"
						onClick={() => setFieldValue('startingGold', calcStartingGold(jobClass.name))}
					>
						Roll
					</button>
				</div>
			</div>

			<div className="CreatorFormJobClass__group--top">
				<h4>Proficiencies:</h4>
				<div>{jobClass.proficiencies.join(", ")}</div>
			</div>

			<div className="CreatorFormJobClass__group--top">
				<h4>Bonus Languages:</h4>
				<Field 
					className="multi-select" 
					name="bonusLanguages" 
					component="select" 
					multiple 
					onChange={(e) => handleMultiSelect(e, setFieldValue)}
				>
					{_.sortBy(race.bonusLanguages).map(language => (
						<option 
							value={language} 
							key={language}
						>
							{language}
						</option>
					))}
				</Field>                                    
			</div>

			<div className="CreatorFormJobClass__group">
				<h4>Deity:</h4>
				<Field 
					className="text-input" 
					name="deity" 
					placeholder="(Optional) Enter the name of a Deity" 
				/>                                  
			</div>
		
			{jobClass.name === 'Wizard' && (
				<div className="CreatorFormJobClass__group">
					<h4>School:</h4>
					<Field 
						className="select" 
						name="school" 
						component="select" 
						onChange={(e) => {
							if (e.target.value === 'Universal') { 
								setFieldError('prohibitedSchools', undefined)	
								setFieldValue('prohibitedSchools', [])
							}						
							handleChange(e)
						}}
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

			{jobClass.name === 'Wizard' && school !== 'Universal' && (
				<>
					<div className="CreatorFormJobClass__group--top">
						<h4>Prohibited School(s):</h4>
						<Field 
							className="multi-select"
							name="prohibitedSchools" 
							component="select" 
							multiple 
							validate={validateProhibitedSchools(school)}
							onChange={(e) => {handleMultiSelect(e, setFieldValue)}}
						>
							{_.difference(schools, [school, 'Universal', 'Divination']).map((school, i) => (
								<option 
									value={school} 
									key={`prohibited${i}`}
								>
									{school}
								</option>
							))}
						</Field>
					</div>
					<ErrorMessage className="CreatorForm__error" name="prohibitedSchools" component="div"/>
				</>
			)}
		</div>
	)
}

export default CreatorFormJobClass
