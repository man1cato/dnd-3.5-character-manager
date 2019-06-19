import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'

import Header from './Header'
import Footer from './Footer'
import PhysicalStats from './PhysicalStats'
import Saves from './Saves'
import Attacks from './Attacks'
import Weapons from './Weapons'
import PreparedSpells from './PreparedSpells'
import { startEditProfile } from '../actions/profile'


const setNestedProps = (prop) => {
	Object.keys(prop).forEach((key) => {
		prop[key].mod = prop[key].mod || ""
		prop[key].total = prop[key].total || prop[key].base
	})
	return prop
}

export class CombatPage extends React.Component {
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
		saves: setNestedProps(this.props.saves),      
		attacks: setNestedProps(this.props.attacks)
	}  	

	handleChange = (e) => {
		const name = e.target.name
		const id = e.target.id
		let value = Number(e.target.value)
		value = (value === 0 || isNaN(value)) ? "" : value
		let total
		this.setState((prevState) => {
			if (name === "hp") {
				if (id === "damage") {
					total = this.props.hp.base + prevState.hp.mod - value
					return {
						hp: update(prevState.hp, {
						damage: { $set: value },
						total: { $set: total }
						})
					}
				} 
				total = this.props.hp.base + value - prevState.hp.damage
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
				total = this.props[name].base + value
			}
			return {
				[name]: update(prevState[name], {
					mod: { $set: value },
					total: { $set: total }          
				})
			}
		}, () => {
			this.props.startEditProfile(this.props.id, { [name]: this.state[name] })
		})
	}

	render () {
		return (
			<div className="layout">
				<Header pageTitle="Combat" />
				<div className="container container--body">
					<div className="section">
						<h3 className="section__title">Physical Stats</h3>
						<PhysicalStats
							hp={this.state.hp}
							ac={this.props.ac}
							initiative={this.state.initiative}
							speed={this.props.speed}
							handleChange={this.handleChange}
						/>
					</div>

					<div className="section">
						<h3 className="section__title">Saving Throws</h3>
						<Saves
							saves={this.state.saves}            
							handleChange={this.handleChange}
						/>
					</div>

					<div className="section">       
						<h3 className="section__title">Attack Bonuses</h3>
						<Attacks 
							attacks={this.state.attacks}
							handleChange={this.handleChange}
						/>
					</div>

					<div className="section">
						<h3 className="section__title">Equipped Weapons</h3>
						<Weapons 
							weaponSet={this.props.equipped.weapons}
							meleeBonus={this.state.attacks.melee.total}
							rangedBonus={this.state.attacks.ranged.total}
							grappleBonus={this.state.attacks.grapple.total}
						/>
					</div>

					{this.props.spellbook && (
						<div className="section">
							<h3 className="section__title">Prepared Spells</h3>
							<PreparedSpells 
								id={this.props.id}
								spellbook={this.props.spellbook}
								spells={this.props.spells}
								startEditProfile={this.props.startEditProfile}
							/>
						</div>
					)}

				</div>

				<Footer />
			</div>  
		)
	}
}

const mapStateToProps = ({profile, spells, jobClasses}) => {
	const baseSaves = jobClasses[profile.jobClass].levels[profile.level].saves
	let saves = profile.saves
	saves.fortitude.base = baseSaves.fortitude
	saves.reflex.base = baseSaves.reflex
	saves.will.base = baseSaves.will
	return {
		id: profile.id,
		hp: profile.hp,
		speed: profile.speed,
		ac: profile.ac,
		initiative: profile.initiative,
		saves,
		baseAttackBonus: profile.baseAttackBonus,
		attacks: profile.attacks,
		equipped: profile.equipped,
		spellbook: profile.spellbook,
		spells
	}
} 

const mapDispatchToProps = (dispatch, props) => ({
  	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CombatPage)