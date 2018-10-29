import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import CreatorFormRace from './CreatorFormRace';

export class CharacterCreationPage extends React.Component {
    state = {
        selectedRace: this.props.races.find((race) => race.name === 'Human'),
        selectedClass: this.props.classes.find((jobClass) => jobClass.name === 'Fighter')
    }

    handleSelect = (e) => {
        const name = e.target.name;
        const id = e.target.value;
        this.setState((prevState) => ({
            selectedRace: name === 'race' ? this.props.races.find((race) => race.id === id) : prevState.selectedRace,
            selectedClass: name === 'jobClass' ? this.props.classes.find((jobClass) => jobClass.id === id) : prevState.selectedClass
        }));
    }

    render() {
        return (
            <div className="layout">
                <Header pageTitle="Character Creation" />
                <CreatorFormRace 
                    selectedRace={this.state.selectedRace} 
                    selectedClass={this.state.selectedClass}
                    handleSelect={this.handleSelect}                    
                />
            </div>
        )
    }
};


const mapStateToProps = (state) => ({
    races: state.races,
    classes: state.classes
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage);
