import React from 'react';
import {connect} from 'react-redux';
import update from 'react-addons-update';

export class StatsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      abilities: {
        str: {
          tempScore: "",
          tempMod: 0
        },
        dex: {
          tempScore: "",
          tempMod: 0
        },
        con: {
          tempScore: "",
          tempMod: 0
        },
        int: {
          tempScore: "",
          tempMod: 0
        },
        wis: {
          tempScore: "",
          tempMod: 0
        },
        cha: {
          tempScore: "",
          tempMod: 0
        }
      }
    }
  }

  onTempScoreChange = (e) => {
    const ability = e.target.id;
    const tempScore = Number(e.target.value);
    const tempMod = Math.floor(tempScore/2 - 5);
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
      <div className="container">

        <div className="row">
          <h2>Level #</h2>
          <span>XP: #####</span>
        </div>

        <div className="row">
          <span>Hit Die: #d#</span>
          <span>To next level: ####</span>
        </div>

        <div className="grid grid--abilities">
          <h3>Ability Scores</h3>
          <div className="grid--abilities__ability">Ability</div>
          <div className="grid--abilities__score">Score</div>
          <div className="grid--abilities__mod">Mod</div>
          <div className="grid--abilities__tempScore">Temp Score</div>
          <div className="grid--abilities__tempMod">Temp Mod</div>
          {Object.entries(this.state.abilities).map((ability) =>
            <h4 className="grid--abilities__ability">{ability[1].name}</h4>
          )}
          {Object.entries(this.state.abilities).map((ability) =>
              <div className="grid--abilities__score">{ability[1].score}</div>
          )}
          {Object.entries(this.state.abilities).map((ability) =>
              <div className="grid--abilities__mod">{ability[1].mod}</div>
          )}
          {Object.entries(this.state.abilities).map((ability) =>
              <input
                className="grid--abilities__tempScore"
                id={ability[0]}
                type="text"
                value={ability[1].tempScore}
                onChange={this.onTempScoreChange}
              />
          )}
          {Object.entries(this.state.abilities).map((ability) =>
              <div className="grid--abilities__tempMod">{ability[1].tempMod}</div>
          )}
        </div>

        <div className="grid grid--skills">
          <h3>Skills</h3>
          {this.props.skills.map((skill) => (
            <div>{skill}</div>
          ))}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  ...state.profile
})

const mapDispatchToProps = (dispatch, props) => ({                              //DISPATCHES THE RETURN VALUE FROM THE CALLED FUNCTION
    startSetProfile: (uid) => dispatch(startSetProfile(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
