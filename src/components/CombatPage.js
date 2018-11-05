import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import Footer from './Footer';
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
    let value = Number(e.target.value);
    value = (value === 0 || isNaN(value)) ? "" : value;
    let total;
    this.setState((prevState) => {
      if (name === "hp") {
        if (id === "damage") {
          total = this.props.hp.base + prevState.hp.mod - value;
          return {
            hp: update(prevState.hp, {
              damage: { $set: value },
              total: { $set: total }
            })
          }
        } 
        total = this.props.hp.base + value - prevState.hp.damage;
      } else if (name === "saves" || name === "attacks") {
        total = this.props[name][id].base + value;
        return {
          [name]: update(prevState[name], {
            [id]: {
              mod: { $set: value },
              total: { $set: total }
            }
          })
        }
      } else {
        total = this.props[name].base + value;
      }
      return {
        [name]: update(prevState[name], {
          mod: { $set: value },
          total: { $set: total }          
        })
      }
    });
  }

  render () {
    return (
      <div className="layout">
        <Header pageTitle="Combat" />
        <div className="layout__body">

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
            weaponSet={this.props.weaponSet}
            meleeBonus={this.state.attacks.melee.total}
            rangedBonus={this.state.attacks.ranged.total}
            grappleBonus={this.state.attacks.grapple.total}
          />

        </div>

        <Footer />
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
  weaponSet: state.profile.weaponSet
})

const mapDispatchToProps = (dispatch, props) => ({
  startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CombatPage)