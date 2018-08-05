import React from 'react';

import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import Abilities from './Abilities';
import Skills from './Skills';
import PhysicalStats from './PhysicalStats';
import Weapons from './Weapons';
import { startEditProfile } from '../actions/profile';


export class CompanionPage extends React.Component {
    state = {
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
        abilities: this.props.abilities
    }

    componentWillUnmount() {
        this.props.startEditProfile(this.props.id, this.state);
    }

    onInputChange = (e) => {
        const name = e.target.name;
        const id = e.target.id;
        let value = Number(e.target.value);
        value = (value === 0 || isNaN(value)) ? "" : value;
        let tempMod;
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
            } else if (name === "abilities") {
                tempMod = value === "" ? "" : Math.floor(value/2 - 5);
                return {
                    abilities: update(prevState.abilities, {
                        [id]: {
                            tempScore: {$set: value},
                            tempMod: {$set: tempMod}
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

    render() {
        return (
            <div>
                <Header pageTitle="Companion" />
                <div className="container container--body">
                    <div className="grid grid--companion">
                        <h3>{this.props.name}</h3>
                        <div>{this.props.type}</div>
                        <h4>Feats</h4>
                        <div>{this.props.feats}</div>
                        <h4>Special Abilities</h4>
                        <div>{this.props.specialAbilities}</div>                    
                    </div>

                    <h3 className="row row--center">Stats</h3>
                    <Abilities
                        abilities={this.state.abilities}
                        onInputChange={this.onInputChange}
                    />

                    <Skills skills={this.props.skills}/>
                    
                    <h3 className="row row--center">Combat</h3>
                    <PhysicalStats
                        hp={this.state.hp}
                        ac={this.props.ac}
                        initiative={this.state.initiative}
                        speed={this.props.speed}
                        onInputChange={this.onInputChange}
                    />

                    <div className="grid grid--combat">
                        <div className="row__title">Attack</div>
                        <div className="row row--left">            
                                {this.props.attack}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
    ...state.profile.companion
})

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CompanionPage)