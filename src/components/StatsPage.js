import React from 'react';
import {connect} from 'react-redux';
import update from 'react-addons-update';
import {startEditProfile} from '../actions/profile';

import Header from './Header';
import Abilities from './Abilities';
import Skills from './Skills';


export class StatsPage extends React.Component {
  constructor(props) {
    super(props);
    let abilities = this.props.abilities;
    Object.keys(abilities).forEach((ability) => {
      abilities[ability].tempScore = abilities[ability].tempScore || "";
      abilities[ability].tempMod = abilities[ability].tempMod || "";
    });
    this.state = {
      abilities
    }
  }

  onTempScoreChange = (e) => {
    const ability = e.target.id;
    const tempScore = Number(e.target.value) === 0 ? "" : Number(e.target.value);
    const tempMod = tempScore === "" ? "" : Math.floor(tempScore/2 - 5);
    this.setState((prevState) => {
      let newAbilities = update(prevState.abilities, {
        [ability]: {
          tempScore: {$set: tempScore},
          tempMod: {$set: tempMod}
        }
      });
      return {abilities: newAbilities};
    });
  }

  componentWillUnmount() {
    this.props.startEditProfile(this.props.id, {...this.state});
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
            {...this.props}
            abilities={this.state.abilities}
            onTempScoreChange={this.onTempScoreChange}
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
  skills: state.profile.skills.sort()
})

const mapDispatchToProps = (dispatch, props) => ({ 
  startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
