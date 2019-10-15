import React, { useEffect, Fragment } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'

import { rollDice, calcAbilityMod, calcSkillPoints } from '../../../utils/utils'
import { abilities } from '../../../utils/staticData'
import './CreatorFormAbilities.scss'


const CreatorFormAbilities = ({
	values,
	setFieldValue, 
	validateForm
}) => {
	const { jobClass } = values
	const raceMods = values.race.abilityMods

	const setSkillPoints = intScore => {
		let skillPoints = calcSkillPoints(jobClass.name, calcAbilityMod(intScore)) * 4
		if (skillPoints < 1) { skillPoints = 1	} 
		if (jobClass.name === 'Human') { skillPoints += 4}			
		setFieldValue('skillPoints', skillPoints, false)
		setFieldValue('remainingSkillPoints', skillPoints)
	}

	useEffect(() => {
		validateForm()
		if (!!values.abilities.int.final) { setSkillPoints(values.abilities.int.final) }
	}, [])

	const handleScoreChange = (ability, score, finalScore) => {
		setFieldValue(`abilities.${ability}.score`, score)
		setFieldValue(`abilities.${ability}.final`, finalScore, false)
		if (ability === 'int') { setSkillPoints(finalScore) }
	}

	return (
		<div className="container--body">					
			<h3 className="section__title">Ability Scores</h3>

			<div className="CreatorFormAbilities__grid">
				<h5 className="grid__col1">Ability</h5>
				<h5 className="grid__col2">Score</h5>
				<h5 className="grid__col3">Race Mod</h5>
				<h5 className="grid__col4">Final</h5>

				{_.keys(abilities).map((ability) => {
					const fieldName = `abilities.${ability}.score`
					const raceMod = raceMods[ability]
					return (
						<Fragment key={ability}>
							<div className="grid__col1">{abilities[ability]} ({ability.toUpperCase()})</div>
							<Field 
								className="grid__col2 number-input"
								type="number"
								name={fieldName}
								data-testid={`${ability}Input`}
								value={values.abilities[ability].score}
								onChange={(e) => {
									const score = Number(e.target.value)
									const finalScore = score + raceMod
									handleScoreChange(ability, score, finalScore)
								}}
							/>	
							<div className="grid__col3">{raceMod}</div>
							<div className="grid__col4">{values.abilities[ability].final}</div>					
							<ErrorMessage className="CreatorFormAbilities__error" name={fieldName} component="div" />
						</Fragment>
					)
				})}

				<button
					className="button grid__col2"
					data-testid="abilitiesRollButton"
					type='button'
					onClick={() => {
						_.keys(abilities).forEach((ability) => {
							const score = rollDice(3, 6)
							const finalScore = score + raceMods[ability]
							handleScoreChange(ability, score, finalScore)
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