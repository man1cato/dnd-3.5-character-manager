import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SkillModal from '../Modals/SkillModal'
import './SkillSet.scss'


export const SkillSet = props => {
	const[clickedSkill, setClickedSkill] = useState(null)

	const skillCount = props.skillSet.length
	const col1 = props.skillSet.slice(0, Math.ceil(skillCount / 2))
	const col2 = props.skillSet.slice(Math.ceil(skillCount / 2))
	
	return (
		<div className="SkillSet">
			<h5 className="SkillSet__name-header">Skill</h5>
			<h5>Ranks</h5>
			<h5 className="SkillSet__name-header">Skill</h5>
			<h5>Ranks</h5>        

			{col1.map(skill => ( 
				<Fragment key={skill.id}>       
					<button 
						className="grid__col1 button--link" 
						id={skill.id}
						type='button'
						onClick={() => setClickedSkill(props.skills[skill.id])}
					>
						{props.skills[skill.id].name}
					</button>
					<div className="grid__col2">{skill.ranks}</div>
				</Fragment>
			))}

			{col2.map(skill => (
				<Fragment key={skill.id}>
					<button 
						className="SkillSet__col3 button--link" 
						id={skill.id}
						type='button'
						onClick={() => setClickedSkill(props.skills[skill.id])}
					>
						{props.skills[skill.id].name}
					</button>
					<div className="grid__col4">{skill.ranks}</div>
				</Fragment>
			))}
			
			<SkillModal 
				clickedSkill={clickedSkill}
				handleCloseModal={() => setClickedSkill(null)}
			/>
		</div>
	)
}


const mapStateToProps = state => ({
  	skills: state.skills
})

export default connect(mapStateToProps)(SkillSet)