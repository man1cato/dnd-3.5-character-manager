import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import CreatorFormRace from './CreatorFormRace';

export class CharacterCreationPage extends React.Component {
    state = {
        selected: this.props.races.find((race) => race.name === 'Human')
    }

    handleSelect = (e) => {
        const raceId = e.target.value;
        this.setState(() => ({
            selected: this.props.races.find((race) => race.id === raceId)
        }));
    }

    render() {
        return (
            <div className="layout">
                <Header pageTitle="Character Creation" />
                <CreatorFormRace 
                    races={this.props.races} 
                    selected={this.state.selected} 
                    handleSelect={this.handleSelect}                    
                />
            </div>
        )
    }
};


const mapStateToProps = (state) => ({
    races: state.races,
    feats: state.feats,
    specialAbilities: state.specialAbilities,
    skills: state.skills,
    spells: state.spells
});

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CharacterCreationPage);
