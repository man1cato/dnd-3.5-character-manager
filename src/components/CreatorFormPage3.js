import React, { useEffect, Fragment } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'
import { rollDice } from '../utils/utils'
import { abilities } from '../utils/staticData'

const CreatorFormPage3 = ({
	values,
	selectedRace,
	handleChange, 
	setFieldValue, 
	validateForm
}) => {
	useEffect(() => {
		validateForm()
	}, [])

	const raceMods = selectedRace.abilityMods

	return (
		<div>
			<h3 className="row--center">Ability Scores</h3>

			<div className="section form-grid--abilities">
				<h5 className="grid__col1 form-grid__header">Ability</h5>
				<h5 className="grid__col2 form-grid__header">Score</h5>
				<h5 className="grid__col3 form-grid__header">Race Mod</h5>
				<h5 className="grid__col4 form-grid__header">Final</h5>

				{_.keys(abilities).map((abbr) => {
					const fieldName = `abilities.${abbr}.score`
					const raceMod = raceMods[abbr]
					return (
						<Fragment key={abbr}>
							<div className="grid__col1">{abilities[abbr]} ({abbr.toUpperCase()})</div>
							<Field 
								className="grid__col2 text-input"
								name={fieldName}
								id={`${abbr}Input`}
								value={values.abilities[abbr].score.toString()}
								onChange={(e) => {
									const score = Number(e.target.value)
									setFieldValue(`abilities.${abbr}.final`, score + raceMod, false)
									handleChange({ 
										target: { 
											name: e.target.name,
											id: e.target.id,
											value: score
										} 
									})
								}}
							/>	
							<div className="grid__col3">{raceMod}</div>
							<div className="grid__col4">{values.abilities[abbr].final}</div>					
							<ErrorMessage className="grid__col-span4 form-group--error" name={fieldName} component="div" />
						</Fragment>
					)
				})}
			</div>

			<div className="row--center">
				<button
					className="button"
					id={`abilitiesRollButton`}
					type='button'
					onClick={() => {
						_.keys(abilities).forEach((abbr) => {
							const score = rollDice(6, 3)
							setFieldValue(`abilities.${abbr}.score`, score)
							setFieldValue(`abilities.${abbr}.final`, score + raceMods[abbr], false)							
						})
					}}
				>
					Roll Scores
				</button>

			</div>
			
		</div>
	)
}

export default CreatorFormPage3