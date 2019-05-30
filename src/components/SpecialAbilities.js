import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import SpecialAbilityModal from './SpecialAbilityModal';

export class SpecialAbilities extends React.Component{
	state = {
		selected: undefined
	}  

	handleOpenModal = (e) => {
		const id = e.target.id
		const selected = this.props.specialAbilities[id]
		this.setState({selected})
	}

	handleCloseModal = () => {
		this.setState({selected: undefined})
	}
	
	render () {    
		const specialAbilities = _.orderBy(this.props.specialAbilityIds.map((id) => {
			return {
				...this.props.specialAbilities[id],
				id
			}
		}), ['name'], ['asc'])

		return (
			<div>
				{specialAbilities.map((specialAbility, i) => (
					<button
						className="button--link"
						id={specialAbility.id}
						key={`specialAbility${i}`}
						onClick={this.handleOpenModal}
					>
						{specialAbility.name}
					</button>
				))}

				<SpecialAbilityModal 
					selected={this.state.selected}
					handleCloseModal={this.handleCloseModal}
				/>
			</div>
		)
	}
}


const mapStateToProps = (state) => ({
  	specialAbilities: state.specialAbilities
})

export default connect(mapStateToProps)(SpecialAbilities)