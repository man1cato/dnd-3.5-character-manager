import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import _ from 'lodash'

import Header from './Header'
import Footer from './Footer'
import PhysicalStats from './PhysicalStats'
import AttackBonuses from './AttackBonuses'
import Saves from './Saves'
import Weapons from './Weapons'
import PreparedSpells from './PreparedSpells'
import { startEditProfile } from '../actions/profile'
import { calcAbilityMod } from '../utils/utils'


export class CombatPage extends React.Component {
	constructor(props) {
		super(props)

		let initiative = {}
		initiative.base = !!this.props.abilities.dex.tempScore ? calcAbilityMod(this.props.abilities.dex.tempScore) : calcAbilityMod(this.props.abilities.dex.score)
		initiative.mod = this.props.initiative.mod || ""
		initiative.total = initiative.base + Number(initiative.mod)

		this.state = {
			hp: {
				base: this.props.hp.base,
				mod: this.props.hp.mod || "",
				damage: this.props.hp.damage || "",
				total: this.props.hp.total || this.props.hp.base,
			},
			initiative,
			// attacks: this.props.attacks
		}  	
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
					total = prevState.hp.base + prevState.hp.mod - value
					return {
						hp: update(prevState.hp, {
							damage: { $set: value },
							total: { $set: total }
						})
					}
				} 
				total = prevState.hp.base + value - prevState.hp.damage
			} else {
				total = prevState[name].base + value
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
	
	handleUpdate = (updates) => {
		// this.setState(() => updates)
		this.props.startEditProfile(this.props.id, updates)
	}

	render () {
		return (
			<div >
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
							profileSaveMods={this.props.saveMods}
							saveBases={this.props.jobClassLevel.saves}
							handleUpdate={this.handleUpdate}
						/>
					</div>

					<div className="section">       
						<h3 className="section__title">Attack Bonuses</h3>
						<AttackBonuses 
							profileAttackBonusMods={this.props.attackBonusMods}
							abilities={this.props.abilities}
							baseAttackBonuses={this.props.jobClassLevel.baseAttackBonuses}
							size={this.props.races[this.props.race].size}
							handleUpdate={this.handleUpdate}
						/>
					</div>

					<div className="section">
						<h3 className="section__title">Equipped Weapons</h3>
						<Weapons 
							weaponSet={this.props.equipped.weapons}
							// meleeBonus={this.state.attacks.melee.total}
							// rangedBonus={this.state.attacks.ranged.total}
							// grappleBonus={this.state.attacks.grapple.total}
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

const mapStateToProps = ({ profile, races, jobClasses, spells }) => ({
	...profile,
	jobClassLevel: jobClasses[profile.jobClass].levels[profile.level],
	races,
	jobClasses,
	spells
})

const mapDispatchToProps = (dispatch, props) => ({
  	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})


export default connect(mapStateToProps, mapDispatchToProps)(CombatPage)