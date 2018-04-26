import React from 'react';
import {connect} from 'react-redux';
import update from 'react-addons-update';

import Abilities from './Abilities';
import Skills from './Skills';

export class StatsPage extends React.Component {
  constructor(props) {
    super(props);
    let abilities = this.props.abilities;
    Object.keys(abilities).forEach((ability) => {
      abilities[ability].tempScore = "";
      abilities[ability].modScore = "";
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

  //ADD COMPONENT WILL UNMOUNT TO TRIGGER UPDATES

  render () {
    return (
      <div className="container container--body">

        <div className="row">
          <h2>Level {this.props.level}</h2>
          <span>XP: {this.props.xp}</span>
        </div>

        <div className="row">
          <span>Hit Die: {this.props.hd}</span>
          <span>To next level: ####</span>
        </div>

        <Abilities
          {...this.props}
          abilities={this.state.abilities}
          onTempScoreChange={this.onTempScoreChange}
        />

        <Skills skills={this.props.skills}/>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  ...state.profile,
  skills: state.profile.skills.sort()
})

const mapDispatchToProps = (dispatch, props) => ({                              //DISPATCHES THE RETURN VALUE FROM THE CALLED FUNCTION
    startSetProfile: (uid) => dispatch(startSetProfile(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
