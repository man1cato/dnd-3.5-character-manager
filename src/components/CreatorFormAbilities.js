import React, { useEffect, Fragment } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'
import { rollDice, calcAbilityMod, calcSkillPoints } from '../utils/utils'
import { abilities } from '../utils/staticData'

const CreatorFormAbilities = ({
	values,
	selectedJobClass,
	selectedRace,
	setFieldValue, 
	validateForm
}) => {
	const raceMods = selectedRace.abilityMods

	const setSkillPoints = (intScore) => {
		let skillPoints = calcSkillPoints(selectedJobClass.name, calcAbilityMod(intScore)) * 4
		if (skillPoints < 1) { skillPoints = 1	} 
		if (selectedJobClass.name === 'Human') { skillPoints += 4}			
		setFieldValue('skillPoints', skillPoints, false)
		setFieldValue('remainingSkillPoints', skillPoints)
	}

	useEffect(() => {
		validateForm()
		if (!!values.abilities.int.final) { setSkillPoints(values.abilities.int.final) }
	}, [])

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
								className="grid__col2 number-input"
								type="number"
								name={fieldName}
								id={`${abbr}Input`}
								value={values.abilities[abbr].score}
								onChange={(e) => {
									const score = Number(e.target.value)
									const finalScore = score + raceMod
									console.log(score, finalScore)
									setFieldValue(`abilities.${abbr}.score`, score)
									setFieldValue(`abilities.${abbr}.final`, finalScore, false)
									if (abbr === 'int') { setSkillPoints(finalScore) }
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
					id="abilitiesRollButton"
					type='button'
					onClick={() => {
						_.keys(abilities).forEach((abbr) => {
							const score = rollDice(6, 3)
							const finalScore = score + raceMods[abbr]
							setFieldValue(`abilities.${abbr}.score`, score)
							setFieldValue(`abilities.${abbr}.final`, finalScore, false)
							if (abbr === 'int') { setSkillPoints(finalScore) }
						})
					}}
				>
					Roll Scores
				</button>

			</div>
			
		</div>
	)
}

export default CreatorFormAbilities