import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import Saves from './Saves';
import Attacks from './Attacks';
import Weapons from './Weapons';
import { startEditProfile } from '../actions/profile';

export class CombatPage extends React.Component {
  constructor(props) {
    super(props);

    let saves = this.props.saves;
    Object.keys(saves).forEach((save) => {
      saves[save].mod = saves[save].mod || "";
      saves[save].total = saves[save].total || saves[save].base;
    });

    let attacks = this.props.attacks;
    Object.keys(attacks).forEach((attack) => {
      attacks[attack].mod = attacks[attack].mod || "";
      attacks[attack].total = attacks[attack].total || attacks[attack].base;
    });

    this.state = {
      hp: {
        base: this.props.hp.base,
        mod: this.props.hp.mod || "",
        damage: this.props.hp.damage || "",
        total: this.props.hp.total || this.props.hp.base,
      },
      initiative: {
        base: this.props.initiative.base, 
        mod: this.props.initiative.mod || "",
        total: this.props.initiative.total || this.props.initiative.base
      },
      saves,      
      attacks      
    }
  }
  
  componentWillUnmount() {
    this.props.startEditProfile(this.props.id, this.state);
  }

  onInputChange = (e) => {
    const name = e.target.name;
    const id = e.target.id;
    let mod = Number(e.target.value);
    mod = (mod === 0 || isNaN(mod)) ? "" : mod;
    let total;
    this.setState((prevState) => {
      if (name === "hp") {
        if (id === "hpDamage") {
          total = this.props.hp.base + prevState.hp.mod - mod;
          return {hp: update(prevState.hp, {
            damage: { $set: mod },
            total: { $set: total }
          })}
        } 
        total = this.props.hp.base + mod - prevState.hp.damage;
        return {hp: update(prevState.hp, {
          mod: { $set: mod },
          total: { $set: total }
        })}
      } 
      if (name === "saves" || name === "attacks") {
        total = this.props[name][id].base + mod;
        return {[name]: update(prevState[name], {
          [id]: {
            mod: { $set: mod },
            total: { $set: total }
          }
        })}
      }
      total = this.props[name].base + mod;
      return {
        [name]: update(prevState[name], {
          mod: { $set: mod },
          total: { $set: total }          
        })
      }
    });
  }

  render () {
    return (
      <div>
        <Header pageTitle="Combat" />
        <div className="container container--body">

          <div className="row">Speed:  {this.props.speed} ft/round</div>

          <div className="grid grid--6col">
            <div className="grid__col1">Initiative</div>
            <div className="row__item">
              <h5>Base</h5>
              <div>{this.props.initiative.base}</div>
            </div>
            <div>+</div>
            <div className="row__item">
              <h5>Mod</h5>
              <input
                type="text"
                name="initiative"
                value={this.state.initiative.mod}
                onChange={this.onInputChange}
              />
            </div>
            <div>=</div>
            <div className="row__item">
              <h5>Total</h5>
              <div>{this.state.initiative.total}</div>
            </div>
          </div> 

          <div className="grid grid--8col">
            <div className="grid__col1">HP</div>
            <div className="row__item">
              <h5>Base</h5>
              <div>{this.props.hp.base}</div>
            </div>
            <div>+</div>
            <div className="row__item">
              <h5>Mod</h5>
              <input
                type="text"
                name="hp"
                value={this.state.hp.mod}
                onChange={this.onInputChange}
              />
            </div>
            <div>-</div>
            <div className="row__item">
              <h5>Dmg</h5>
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
              <h5>Curr</h5>
              <div>{this.state.hp.total}</div>
            </div>
          </div>

          <div className="grid grid--5col">
            <div className="grid__col1">Armor Class</div>
            <div className="row__item">
              <h5>Base</h5>
              <div>{this.props.ac.base}</div>
            </div>
            <div className="row__item">
              <h5>Flat</h5>
              <div>{this.props.ac.flat}</div>
            </div>
            <div className="row__item">
              <h5>Touch</h5>
              <div>{this.props.ac.touch}</div>
            </div>
          </div>                   

          <Saves
            saves={this.state.saves}            
            onInputChange={this.onInputChange}
          />            

          <div className="row">Base Attack Bonus: {this.props.bab.join(" / ")}</div>

          <Attacks 
            attacks={this.state.attacks}
            onInputChange={this.onInputChange}
          />

          <Weapons />

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
  initiative: state.profile.initiative,
  saves: state.profile.saves,
  bab: state.profile.bab,
  attacks: state.profile.attacks
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CombatPage)