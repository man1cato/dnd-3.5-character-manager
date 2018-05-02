import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { startEditProfile } from '../actions/profile';

import Header from './Header';
import Saves from './Saves';
import Attacks from './Attacks';
import { updateLocale } from 'moment';

export class CombatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hp: {
        base: this.props.hp,
        mod: "",
        damage: "",
        total: this.props.hp,
      },
      initiative: {
        base: this.props.initiative,
        mod: "",
        total: this.props.initiative
      },
      fortitude: {
        base: this.props.fortitude,
        mod: "",
        total: this.props.fortitude
      },
      reflex: {
        base: this.props.reflex,
        mod: "",
        total: this.props.reflex
      },
      will: {
        base: this.props.will,
        mod: "",
        total: this.props.will
      },      
      melee: {
        base: this.props.melee,
        mod: "",
        total: this.props.melee
      },
      ranged: {
        base: this.props.ranged,
        mod: "",
        total: this.props.ranged
      },
      grapple: {
        base: this.props.grapple,
        mod: "",
        total: this.props.grapple
      }      
    }
  }
  
  componentWillUnmount() {
    this.props.startEditProfile(this.props.id, { ...this.state });
  }

  onInputChange = (e) => {
    const name = e.target.name;
    const id = e.target.id;
    const value = Number(e.target.value) === 0 ? "" : Number(e.target.value);
    this.setState((prevState) => {
      if (name === "hp") {
        let newHp;
        if (id === "hpDamage") {
          const total = prevState.hp.total - value;
          return {hp: update(prevState.hp, {
            damage: { $set: value },
            total: { $set: total }
          })}
        } else {
          const total = prevState.hp.total + value;
          return {hp: update(prevState.hp, {
            mod: { $set: value },
            total: { $set: total }
          })
        }}
      }
      const total = prevState[name].base + value;
      return {[name]: update(prevState[name], {
          mod: { $set: value },
          total: { $set: total }
      })}
    });
  }

  render () {
    return (
      <div>
        <Header pageTitle="Combat" />
        <div className="container container--body">

          
          <div className="row">Speed:  {this.props.speed} ft/round</div>

          <div className="grid grid--8col">
            <div className="grid__left-col">HP</div>
            <div className="row__item">
              <h4>Base</h4>
              <div>{this.state.hp.base}</div>
            </div>
            <div>+</div>
            <div className="row__item">
              <h4>Mod</h4>
              <input
                type="text"
                name="hp"
                value={this.state.hp.mod}
                onChange={this.onInputChange}
              />
            </div>
            <div>-</div>
            <div className="row__item">
              <h4>Dmg</h4>
              <input
                type="text"
                name="hp"
                id="hpDamage"
                value={this.state.hp.damage}
                onChange={this.onInputChange}
              />
            </div>
            <div>=</div>
            <div className="row__item">
              <h4>Curr</h4>
              <div>{this.state.hp.total}</div>
            </div>
          </div>

          <div className="grid grid--6col">
            <div className="grid__left-col">AC</div>
            <div className="row__item">
              <h4>Base</h4>
              <div>{this.props.ac.base}</div>
            </div>
            <div></div>
            <div className="row__item">
              <h4>Flat</h4>
              <div>{this.props.ac.flat}</div>
            </div>
            <div></div>
            <div className="row__item">
              <h4>Touch</h4>
              <div>{this.props.ac.touch}</div>
            </div>
          </div>

          <div className="grid grid--6col">
            <div className="grid__left-col">Initiative</div>
            <div className="row__item">
              <h4>Base</h4>
              <div>{this.state.initiative.base}</div>
            </div>
            <div>+</div>
            <div className="row__item">
              <h4>Temp Mod</h4>
              <input
                type="text"
                name="initiative"
                value={this.state.initiative.mod}
                onChange={this.onInputChange}
              />
            </div>
            <div>=</div>
            <div className="row__item">
              <h4>Total</h4>
              <div>{this.state.initiative.total}</div>
            </div>
          </div>          

          <Saves 
            {...this.state}
            onInputChange={this.onInputChange}
          />            

          <Attacks 
            {...this.state}
            bab={this.props.bab}
            onInputChange={this.onInputChange}
          />

        </div>
      </div>  
    )
  }
}

const mapStateToProps = (state) => ({
  id: state.profile.id,
  hp: state.profile.hp,
  speed: state.profile.speed,
  ac: state.profile.ac,
  initiative: state.profile.abilities.dex.mod,
  ...state.profile.saves,
  ...state.profile.attacks
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CombatPage)