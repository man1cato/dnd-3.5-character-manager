import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import { ErrorMessage } from 'formik'

import Counter from '../../../components/Counter/Counter'
import SkillModal from '../../../components/Modals/SkillModal'
import { apiObjectToArray } from '../../../utils/utils'
import './CreatorFormSkills.scss'


const CreatorFormSkills = ({
	values,
	skills,
	setFieldValue
}) => { 
	const { skillSet, skillPoints } = values
	const [assignedSkillPoints, setAssignedSkillPoints] = useState(0)
	const [selected, setSelected] = useState(undefined)

	useEffect(() => {
		setAssignedSkillPoints(_.sumBy(skillSet, skill => skill.ranks))
	})

	useEffect(() => {
		setFieldValue('remainingSkillPoints', skillPoints - assignedSkillPoints)
	}, [assignedSkillPoints])
	
	const handleChange = (index, value) => {
		const ranks = value > 0 ? value : 0
		setFieldValue(`skillSet[${index}].ranks`, ranks)
	}

	return (
		<div className="container--body CreatorFormSkills">
			<h3 className="section__title">Assign Skill Points</h3>
			<div className="section__title">{assignedSkillPoints}/{skillPoints}</div>
			<ErrorMessage className="CreatorForm__error--center" name="remainingSkillPoints" component="div" />

			<div className="CreatorFormSkills__scroll-container">
				<div className="CreatorFormSkills__grid--header">
					<h5 className="grid__col1">Skill</h5>
					<h5>Ranks</h5>
				</div>
				<div className="CreatorFormSkills__scroll-list">
					<div className="CreatorFormSkills__grid">
						{apiObjectToArray(skills).map((skill, i) => {
							const ranks = skillSet[i].ranks
							return (
								<Fragment key={i}>
									<button
										className="grid__col1 button--link"	
										type="button"
										onClick={() => setSelected(skill)}
									>
										{skill.name}
									</button>

									<Counter
										className="CreatorFormSkills__counter"
										value={ranks}
										updateValue={value => handleChange(i, value)}
									/>							
								</Fragment>
							)
						})}
					</div>
				</div>
			</div>
			
			<SkillModal
				selected={selected}
				handleCloseModal={() => setSelected(undefined)}
			/>

		</div>
	)
}
export default CreatorFormSkills