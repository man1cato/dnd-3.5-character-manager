import React, {Fragment} from 'react';

import { connect } from 'react-redux';
import update from 'immutability-helper';

import Header from './Header';
import Footer from './Footer';
import SpellModal from './SpellModal';
import { startEditProfile } from '../actions/profile';


export class SpellbookPage extends React.Component {
	state = {
		spellbook: this.props.spellbook,
		preparedSpells: [],
		selected: undefined
	}

	handleOpenModal = (e) => {
		const id = e.target.id
		const selected = this.props.spells[id]
		this.setState({selected})
	}

	handleCloseModal = () => {
		this.setState({selected: undefined})
	}

	handleChange = (e) => {
		const spellId = e.target.getAttribute("spellid")
		const level = e.target.getAttribute("level")
		const index = e.target.getAttribute("index")
		const attribute = e.target.getAttribute("attribute")
		const valueChange = Number(e.target.getAttribute("change"))
		const name = e.target.name

		this.setState((prevState) => {
			const spell = prevState.spellbook[level].spells[index]
			const value = prevState.spellbook[level].spells[index][attribute] + valueChange
			const remaining = attribute === "prepared" ? value - spell.used : spell.prepared - value
			let preparedSpells = prevState.preparedSpells;
         if (value > 0 && !preparedSpells.includes(spellId)) {
            preparedSpells.push(spellId)
			}
			if (value === 0 || name === "clear") {
            preparedSpells = preparedSpells.filter((id) => id !== spellId)
			}
			
			if (name === "clear") {
				return {
					spellbook: update(prevState.spellbook, {
						[level]: {
							spells: {
								[index]: {
									prepared: { $set: 0 },
									used: { $set: 0 },
									remaining: { $set: 0 }
								}
							}
						}
					}),
					preparedSpells
				}
			}

			return {
				spellbook: update(prevState.spellbook, {
					[level]: {
						spells: {
							[index]: {
								[attribute]: { $set: value },
								remaining: { $set: remaining }
							}
						}
					}
				}),
				preparedSpells
			}
		}, () => {
			this.setState((prevState) => {
				const total = prevState.spellbook[level].spells.map((spell) => spell.prepared).reduce((total, num) => total + num);
				return {
					spellbook: update(prevState.spellbook, {
						[level]: {
							total: { $set: total }
						}
					})
				}
			}, () => {
				this.props.startEditProfile(this.props.id, {spellbook: this.state.spellbook});
			})
		})
	}
	
	render() {
		return (
			<div className="layout">
				<Header pageTitle="Spellbook" />
				<SpellModal 
					selected={this.state.selected}
					handleCloseModal={this.handleCloseModal}
				/>
				<div className="container container--body">

					{this.state.spellbook.map((page, level) => (
						<div key={level}>
							<h3 className="row row--center">Level {level} Spells ({page.total}/{page.spellsPerDay})</h3>

							<div className="grid grid--spellbook">
								<h5 className="grid__col1">Spell</h5>
								<h5 className="grid--spellbook__school">School</h5>
								<h5>Prep</h5>
								<h5>Rmng</h5>
								<div></div>

								{page.spells.map((spell, i) => (
									<Fragment key={i}>
										<button 
											className="grid__col1 button--link" 
											id={spell.id}
											key={`spell${i}`} 
											onClick={this.handleOpenModal}
										>
											{spell.name}
										</button>

										<div className="grid--spellbook__school" key={`school${i}`}>
											{spell.school.substr(0,4)}
										</div>
										
										<div className="grid__col3 grid--spellbook__attribute" key={`prep${i}`}>
											<button
												change={1}
												spellid={spell.id}
												index={i}
												attribute="prepared"
												level={level}
												onClick={this.handleChange}
											>+</button>
											<div>{spell.prepared}</div>
											<button
												change={-1}
												spellid={spell.id}
												index={i}
												attribute="prepared"
												level={level}
												onClick={this.handleChange}
											>-</button>
										</div>
										
										<div className="grid__col4" key={`rmng${i}`}>{spell.remaining}</div>

										{spell.prepared !== 0 || spell.remaining !== 0 || spell.used !== 0 ?
											<button 
												className="grid__col5" 
												name="clear"
												key={`clear${i}`}
												spellid={spell.id}
												index={i}
												level={level}
												onClick={this.handleChange}
											>
												Clear
											</button>
											:
											<div></div>
										}
									</Fragment>
								))}                        

							</div>
						</div>
					))}

				</div>
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	id: state.profile.id,
	spellbook: state.profile.spellbook,
	spells: state.spells
})

const mapDispatchToProps = (dispatch, props) => ({
	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(SpellbookPage)