import React from 'react';
import {connect} from 'react-redux';
import update from 'react-addons-update';
import {startEditProfile} from '../actions/profile';

import Header from './Header';
import Abilities from './Abilities';
import SkillSet from './SkillSet';


export class StatsPage extends React.Component {
  state = {
    abilities: this.props.abilities
  }

  componentWillUnmount() {
    this.props.startEditProfile(this.props.id, {
      abilities: this.state.abilities
    });
  }

  onInputChange = (e) => {
    const ability = e.target.id;
    const value = Number(e.target.value);
    const tempScore = value === 0 || isNaN(value) ? "" : value;
    const tempMod = tempScore === "" ? "" : Math.floor(tempScore/2 - 5);
    this.setState((prevState) => ({
      abilities: update(prevState.abilities, {
        [ability]: {
          tempScore: {$set: tempScore},
          tempMod: {$set: tempMod}
        }
      })
    }))
  }  

  render () {
    return (
      <div>
        <Header pageTitle="Character Stats" />
        <div className="container container--body">

          <div className="row">
            <h3>Level {this.props.level}</h3>
            <span>XP: {this.props.xp}</span>
          </div>

          <div className="row">
            <span>Hit Die: {this.props.hd}</span>
            <span>To next level: {this.props.toNextLevel}</span>
          </div>

          <Abilities
            abilities={this.state.abilities}
            onInputChange={this.onInputChange}
          />

          <SkillSet 
            skillSet={this.props.skillSet}
          />

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  hd: state.profile.hd,
  level: state.profile.level,
  xp: state.profile.xp,
  toNextLevel: state.profile.toNextLevel,
  abilities: state.profile.abilities,
  skillSet: state.profile.skillSet
})

const mapDispatchToProps = (dispatch, props) => ({ 
  startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
