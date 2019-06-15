import React, { useEffect } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'
import { rollDice } from '../utils/utils'
import { abilities } from '../utils/staticData'

const CreatorFormPage3 = ({
	values,
	handleChange, 
	setFieldValue, 
	setFieldError,
	validateForm
}) => {
	useEffect(() => {
		validateForm()
	}, [])

	const hasRolled = _.find(Object.values(values.abilities), (obj) => obj.score !== '')

	return (
		<div>
			<h3 className="row--center">Ability Scores</h3>

			<div className="row--center">
				<button
					id={`abilitiesRollButton`}
					type='button'
					onClick={() => {
						Object.keys(abilities).forEach((abbr) => {
							setFieldValue(`abilities.${abbr}.score`, rollDice(6, 3))
						})
					}}
				>
					Roll
				</button>
			</div>

			{Object.keys(abilities).map((abbr) => {
				const valueName = `abilities.${abbr}.score`
				return (
					<div className="form__group" key={abbr}>
						<div className="form__content--nowrap">
							<h4>{abilities[abbr]} ({abbr.toUpperCase()})</h4>
							<Field name={valueName} id={`${abbr}Input`} />								
						</div>
						<ErrorMessage name={valueName} component="div" />
					</div>
				)
			})}

			<div className="row--center">
				<button
					id='abilitiesResetButton'
					type='submit'
					disabled={!hasRolled}
					onClick={() => {
						setFieldValue('abilities.str.score', '')
						setFieldValue('abilities.dex.score', '')
						setFieldValue('abilities.con.score', '')
						setFieldValue('abilities.int.score', '')
						setFieldValue('abilities.wis.score', '')
						setFieldValue('abilities.cha.score', '')
					}}
				>
					Reset
				</button>
			</div>
			
		</div>
	)
}

export default CreatorFormPage3