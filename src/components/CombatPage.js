import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import PhysicalStats from './PhysicalStats';
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

          <PhysicalStats
              hp={this.state.hp}
              ac={this.props.ac}
              initiative={this.state.initiative}
              speed={this.props.speed}
              onInputChange={this.onInputChange}
          />                              

          <Saves
            saves={this.state.saves}            
            onInputChange={this.onInputChange}
          />            

          <Attacks 
            attacks={this.state.attacks}
            onInputChange={this.onInputChange}
          />

          <Weapons 
            weapons={this.props.weapons}
            meleeBonus={this.state.attacks.melee.total}
            rangedBonus={this.state.attacks.ranged.total}
            grappleBonus={this.state.attacks.grapple.total}
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
  initiative: state.profile.initiative,
  saves: state.profile.saves,
  bab: state.profile.bab,
  attacks: state.profile.attacks,
  weapons: state.profile.weapons
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CombatPage)