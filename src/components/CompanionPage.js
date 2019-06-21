import React from 'react'

import { connect } from 'react-redux'
import update from 'immutability-helper'

import Header from './Header'
import Footer from './Footer'
import Abilities from './Abilities'
import Feats from './Feats'
import SpecialAbilities from './SpecialAbilities'
import SkillSet from './SkillSet'
import PhysicalStats from './PhysicalStats'
import { startEditProfile } from '../actions/profile'


export class CompanionPage extends React.Component {
	state = {
		companion: {
			...this.props.companion,
			hp: {
				base: this.props.companion.hp.base,
				mod: this.props.companion.hp.mod || "",
				damage: this.props.companion.hp.damage || "",
				total: this.props.companion.hp.total || this.props.companion.hp.base
			},
			initiative: {
				base: this.props.companion.initiative.base, 
				mod: this.props.companion.initiative.mod || "",
				total: this.props.companion.initiative.total || this.props.companion.initiative.base
			}
		}
	}

	handleChange = (e) => {
		const name = e.target.name
		const id = e.target.id
		let value = Number(e.target.value)
		value = (value === 0 || isNaN(value)) ? "" : value
		let tempMod
		let total

		this.setState((prevState) => {
			if (name === "hp") {
				if (id === "damage") {
					total = this.props.companion.hp.base + prevState.companion.hp.mod - value
					return {
						companion: update(prevState.companion, {
							hp: {
								damage: { $set: value },
								total: { $set: total }
							}
						})
					}
				} 
				total = this.props.companion.hp.base + value - prevState.companion.hp.damage
			} else if (name === "saves" || name === "attacks") {
				total = this.props.companion[name][id].base + value
				return {
					companion: update(prevState.companion, {
						[name]: {
							[id]: {
								mod: { $set: value },
								total: { $set: total }
							}
						}
					})
				}
			} else if (name === "abilities") {
				tempMod = value === "" ? "" : Math.floor(value/2 - 5)
				return {
					companion: update(prevState.companion, {
						abilities: {
							[id]: {
								tempScore: {$set: value},
								tempMod: {$set: tempMod}
							}
						}
					})
				}
			} else {
				total = this.props.companion[name].base + value
			}
			return {
				companion: update(prevState.companion, {
					[name]: {
						mod: { $set: value },
						total: { $set: total }          
					}
				})
			}
		}, () => {
			this.props.startEditProfile(this.props.id, {
				companion: { 
					...this.state.companion,
					[name]: this.state.companion[name] 
				}
			})
		})
	}

	render() {
		return (
			<div >
				<Header pageTitle="Companion" />
				<div className="container container--body">
					<div className="section grid grid--companion">
						<h3>{this.props.companion.name}</h3>
						<div>{this.props.companion.type}</div>

						<h4 className="grid__col1">Special Abilities</h4>
						<SpecialAbilities specialAbilityIds={this.props.companion.specialAbilities} />                    
						
						<h4 className="grid__col1">Feats</h4>
						<Feats featIds={this.props.companion.feats} />
					</div>

					<div className="section">
						<h3 className="section__title">Abilities</h3>
						<Abilities
							abilities={this.state.companion.abilities}
							handleChange={this.handleChange}
						/>
					</div>

					<div className="section">
						<h3 className="section__title">Skills</h3>
						<SkillSet 
							skillSet={this.props.companion.skillSet}                        
						/>
					</div>

					<h3 className="section__title">Combat</h3>
					<PhysicalStats
						hp={this.state.companion.hp}
						ac={this.props.companion.ac}
						initiative={this.state.companion.initiative}
						speed={this.props.companion.speed}
						handleChange={this.handleChange}
					/>

					<div className="grid grid--combat">
						<div className="row__title">Attack</div>
						<div className="row--left">            
							{this.props.companion.attack}
						</div>
					</div>

				</div>
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	id: state.profile.id,
	companion: state.profile.companion
})

const mapDispatchToProps = (dispatch, props) => ({
	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CompanionPage)