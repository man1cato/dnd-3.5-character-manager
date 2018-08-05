import React from 'react';
import {connect} from 'react-redux';
import update from 'react-addons-update';
import {startEditProfile} from '../actions/profile';

import Header from './Header';
import Abilities from './Abilities';
import Skills from './Skills';


export class StatsPage extends React.Component {
  state = {
      abilities: this.props.abilities
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

  componentWillUnmount() {
    this.props.startEditProfile(this.props.id, this.state);
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

          <Skills skills={this.props.skills}/>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  ...state.profile,
  skills: state.profile.skills
})

const mapDispatchToProps = (dispatch, props) => ({ 
  startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
