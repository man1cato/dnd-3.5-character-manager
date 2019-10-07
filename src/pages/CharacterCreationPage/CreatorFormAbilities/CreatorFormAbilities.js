import React, { useEffect, Fragment } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'

import { rollDice, calcAbilityMod, calcSkillPoints } from '../../../utils/utils'
import { abilities } from '../../../utils/staticData'
import './CreatorFormAbilities.scss'


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
		<div className="container--body">					
			<h3 className="section__title">Ability Scores</h3>

			<div className="CreatorFormAbilities__grid">
				<h5 className="grid__col1">Ability</h5>
				<h5 className="grid__col2">Score</h5>
				<h5 className="grid__col3">Race Mod</h5>
				<h5 className="grid__col4">Final</h5>

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
									setFieldValue(`abilities.${abbr}.score`, score)
									setFieldValue(`abilities.${abbr}.final`, finalScore, false)
									if (abbr === 'int') { setSkillPoints(finalScore) }
								}}
							/>	
							<div className="grid__col3">{raceMod}</div>
							<div className="grid__col4">{values.abilities[abbr].final}</div>					
							<ErrorMessage className="CreatorFormAbilities__error" name={fieldName} component="div" />
						</Fragment>
					)
				})}

				<button
					className="button grid__col2"
					id="abilitiesRollButton"
					type='button'
					onClick={() => {
						_.keys(abilities).forEach((abbr) => {
							const score = rollDice(3, 6)
							const finalScore = score + raceMods[abbr]
							setFieldValue(`abilities.${abbr}.score`, score)
							setFieldValue(`abilities.${abbr}.final`, finalScore, false)
							if (abbr === 'int') { setSkillPoints(finalScore) }
						})
					}}
				>
					Roll
				</button>
			</div>
			
		</div>
	)
}

export default CreatorFormAbilities