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

			<div className="grid grid--abilities-set">
				<h5 className="grid__col1">Ability</h5>
				<h5 className="grid__col2">Score</h5>
				<h5 className="grid__col3">Race Mod</h5>
				<h5 className="grid__col4">Final</h5>

				{_.keys(abilities).map((abbr) => {
					const fieldName = `abilities.${abbr}.score`
					const raceMod = raceMods[abbr]
					return (
						<Fragment key={abbr}>
							<h4 className="grid__col1">{abilities[abbr]} ({abbr.toUpperCase()})</h4>
							<Field 
								className="grid__col2"
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
							<ErrorMessage className="grid__col-span4" name={fieldName} component="div" />
						</Fragment>
					)
				})}
			</div>

			<div className="row--center">
				<button
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