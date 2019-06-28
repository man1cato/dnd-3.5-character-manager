import React from 'react'
import { connect } from 'react-redux'
import SkillModal from './SkillModal'

export class SkillSet extends React.Component{
	state = {
		selected: undefined
	}  

	handlePick = (e) => {
		const id = e.target.id
		const selected = this.props.skills[id]
		this.setState({selected})
	}

	handleCloseModal = () => {
		this.setState({selected: undefined})
	}
	
	render () {
		const skillCount = this.props.skillSet.length
		const col1 = this.props.skillSet.slice(0, Math.ceil(skillCount / 2))
		const col2 = this.props.skillSet.slice(Math.ceil(skillCount / 2))
		
		return (
			<div className="grid--skills">
				<h5 className="grid--skills__name">Skill</h5>
				{col1.map((skill, i) => (        
					<button 
						className="grid__col1 grid--skills__name button--link" 
						id={skill.id}
						key={i}
						onClick={this.handlePick}
					>
						{this.props.skills[skill.id].name}
					</button>
				))}

				<h5>Ranks</h5>
				{col1.map((skill, i) => (
					<div className="grid__col2" key={i}>{skill.ranks}</div>
				))}
				
				<h5 className="grid--skills__name">Skill</h5>
				{col2.map((skill, i) => (
					<button 
						className="grid__col3 grid--skills__name button--link" 
						id={skill.id}
						key={i}
						onClick={this.handlePick}
					>
						{this.props.skills[skill.id].name}
					</button>
				))}
				
				<h5>Ranks</h5>        
				{col2.map((skill, i) => (
					<div className="grid__col4" key={i}>{skill.ranks}</div>
				))}

				<SkillModal 
					selected={this.state.selected}
					handleCloseModal={this.handleCloseModal}
				/>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
  	skills: state.skills
})

export default connect(mapStateToProps)(SkillSet)