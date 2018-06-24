import React from 'react';

import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import Skills from './Skills';
import PhysicalStats from './PhysicalStats';
import { startEditProfile } from '../actions/profile';


export class CompanionPage extends React.Component {
    constructor(props) {
        super(props);

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
            }
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
                        <h4>Features</h4>
                        <div>{this.props.features}</div>                        
                    </div>

                    <div className="grid grid--abilities">
                        <h4 className="grid__col1">Ability</h4>
                        <h4 className="grid__col2">Score</h4>
                        <h4 className="grid__col3">Mod</h4>
                        {Object.entries(this.props.abilities).map((ability, i) =>
                            <div className="grid__col1" key={i}>{ability[1].name}</div>
                        )}
                        {Object.entries(this.props.abilities).map((ability, i) =>
                            <div className="grid__col2" key={i}>{ability[1].score}</div>
                        )}
                        {Object.entries(this.props.abilities).map((ability, i) =>
                            <div className="grid__col3" key={i}>{ability[1].mod}</div>
                        )}
                    </div>

                    <Skills skills={this.props.skills}/>
                    
                    <h3 className="row row--center">Combat</h3>
                    <PhysicalStats
                        hp={this.state.hp}
                        ac={this.props.ac}
                        initiative={this.state.initiative}
                        speed={this.props.speed}
                        onInputChange={this.onInputChange}
                    />

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