import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import _ from 'lodash'

import Counter from '../../components/Counter/Counter'
import SpellModal from '../../components/Modals/SpellModal'
import { startEditProfile } from '../../store/actions/profile'
import './SpellbookPage.scss'


const calcPreparedTotals = (spellbook) => _.map(spellbook, (level) => _.reduce(level, (total, spell) => total + spell.prepared, 0))

export const SpellbookPage = (props) => {
	const [spellbook, setSpellbook] = useState(props.profile.spellbook)
	const [preparedTotals, setPreparedTotals] = useState(calcPreparedTotals(spellbook))
	const [clickedSpell, setClickedSpell] = useState(null)
	const spellsPerDay = props.jobClasses[props.profile.jobClass].levels[props.profile.level].spellsPerDay

	useEffect(() => {
		setPreparedTotals(calcPreparedTotals(spellbook))
		props.startEditProfile(props.profile.id, { spellbook })
	}, [spellbook])

	const handleChange = (level, index, value) => {
		const spell = spellbook[level][index]

		setSpellbook(update(spellbook, {
			[level]: {
				[index]: {
					prepared: { $set: value },
					remaining: { $set: value - spell.used }
				}
			}
		}))
	}
	
	return (
		<div className="container--body">
			{spellbook.map((page, level) => (
				<div className="section" key={level}>
					<h3 className="section__title">Level {level} Spells ({preparedTotals[level]}/{spellsPerDay[level]})</h3>

					<div className="spells-grid">
						<h5 className="grid__col1">Spell</h5>
						<h5>Prepared</h5>
						<h5>Rmng</h5>

						{page.map((spell, index) => (
							<Fragment key={index}>
								<button 
									className="grid__col1 button--link" 
									id={spell.id}
									onClick={() => setClickedSpell(props.spells[spell.id])}
								>
									{props.spells[spell.id].name}
								</button>

								<Counter
									value={spell.prepared}
									updateValue={value => handleChange(level, index, value)}
									noInput
								/>
								
								<div id={`${spell.id}Remaining`}>{spell.remaining}</div>

								{(spell.prepared !== 0 || spell.remaining !== 0 || spell.used !== 0) && (
									<button 
										className="clear-button" 
										onClick={() => setSpellbook(update(spellbook, {
											[level]: {
												[index]: {
													prepared: { $set: 0 },
													used: { $set: 0 },
													remaining: { $set: 0 }
												}
											}
										}))}
									>
										<ion-icon name="close-circle" size="small" />
									</button>
								)}
							</Fragment>
						))}                        

					</div>
				</div>
			))}

			<SpellModal
				clickedSpell={clickedSpell}
				handleCloseModal={() => setClickedSpell(undefined)}
			/>

		</div>
	)
	
}

const mapStateToProps = (state) => ({
	profile: state.profile,
	spells: state.spells,
	jobClasses: state.jobClasses
})

const mapDispatchToProps = (dispatch) => ({
	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})


export default connect(mapStateToProps, mapDispatchToProps)(SpellbookPage)