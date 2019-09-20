import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import { Field, ErrorMessage } from 'formik'

import SkillModal from '../SkillModal'
import { apiObjectToArray } from '../../utils/utils'


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
	

	return (
		<>
			<h3 className="row--center">Assign Skill Points</h3>
			<div className="row--center">{assignedSkillPoints}/{skillPoints}</div>
			<ErrorMessage className="row--center form-group--error" name="remainingSkillPoints" component="div" />
			
			<div className="form-grid--skills">
				<h5 className="grid__col1 form-grid__header">Skill</h5>
				<h5 className="grid__col3 form-grid__header">Ranks</h5>

				{apiObjectToArray(skills).map((skill, i) => {
					const fieldName = `skillSet[${i}].ranks`
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
							
							<button 
								className="grid__col2 button" 
								type="button" 
								onClick={() => setFieldValue(fieldName, ranks > 0 ? ranks - 1 : 0)}
							>
								-
							</button>
							
							<Field 
								className="grid__col3 number-input"
								id={skill.id}
								name={fieldName}
								type="number"
							/>		

							<button 
								className="grid__col4 button" 
								type="button" 
								onClick={() => setFieldValue(fieldName, ranks + 1)}
							>
								+
							</button>
						</Fragment>
					)
				})}
			</div>

			
			<SkillModal
				selected={selected}
				handleCloseModal={() => setSelected(undefined)}
			/>

		</>
	)
}
export default CreatorFormSkills