import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import SpecialAbilityModal from './SpecialAbilityModal';

export class SpecialAbilities extends React.Component{
	state = {
		selected: undefined
	}  

	handleOpenModal = (e) => {
		const specialAbilityId = e.target.id;
		const selected = this.props.specialAbilities.find((specialAbility) => specialAbility.id === specialAbilityId);
		this.setState({selected});
	}

	handleCloseModal = () => {
		this.setState({selected: undefined});
	}
	
	render () {    
		const specialAbilities = _.orderBy(this.props.specialAbilityIds.map((specialAbilityId) => {
			return this.props.specialAbilities.find((specialAbility) => specialAbility.id === specialAbilityId)
		}), ['name'], ['asc']);

		return (
			<div>
				{specialAbilities.map((specialAbility) => (
					<button
						className="button--link"
						id={specialAbility.id}
						key={specialAbility.id}
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
});

export default connect(mapStateToProps)(SpecialAbilities);