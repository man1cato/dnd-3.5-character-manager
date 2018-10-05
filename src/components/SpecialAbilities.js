import React from 'react';
import {connect} from 'react-redux';
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
    return (
      <div className="grid--profile__features-value">
        {this.props.specialAbilityIds.map((specialAbilityId) => (
        <button
            className="button--link"
            id={specialAbilityId}
            key={specialAbilityId}
            onClick={this.handleOpenModal}
        >
            {this.props.specialAbilities.find((specialAbility) => specialAbility.id === specialAbilityId).name}
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