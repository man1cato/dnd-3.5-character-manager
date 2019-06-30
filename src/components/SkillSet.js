import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import SkillModal from './SkillModal'

export const SkillSet = (props) => {
	const[selected, setSelected] = useState(undefined)

	const skillCount = props.skillSet.length
	const col1 = props.skillSet.slice(0, Math.ceil(skillCount / 2))
	const col2 = props.skillSet.slice(Math.ceil(skillCount / 2))
	
	return (
		<div className="grid--skills">
			<h5 className="grid--skills__name">Skill</h5>
			<h5>Ranks</h5>
			<h5 className="grid--skills__name">Skill</h5>
			<h5>Ranks</h5>        

			{col1.map((skill) => ( 
				<Fragment key={skill.id}>       
					<button 
						className="grid__col1 button--link" 
						id={skill.id}
						onClick={() => setSelected(props.skills[skill.id])}
					>
						{props.skills[skill.id].name}
					</button>
					<div className="grid__col2">{skill.ranks}</div>
				</Fragment>
			))}

			{col2.map((skill) => (
				<Fragment key={skill.id}>
					<button 
						className="grid__col3 justify-self-left button--link" 
						id={skill.id}
						onClick={() => setSelected(props.skills[skill.id])}
					>
						{props.skills[skill.id].name}
					</button>
					<div className="grid__col4">{skill.ranks}</div>
				</Fragment>
			))}
			
			<SkillModal 
				selected={selected}
				handleCloseModal={() => setSelected()}
			/>
		</div>
	)
}


const mapStateToProps = (state) => ({
  	skills: state.skills
})

export default connect(mapStateToProps)(SkillSet)