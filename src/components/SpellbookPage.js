import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import _ from 'lodash'

import SpellModal from './SpellModal'
import { startEditProfile } from '../actions/profile'


const calcPreparedTotals = (spellbook) => _.map(spellbook, (level) => _.reduce(level, (total, spell) => total + spell.prepared, 0))

export const SpellbookPage = (props) => {
	const [spellbook, setSpellbook] = useState(props.profile.spellbook)
	const [preparedTotals, setPreparedTotals] = useState(calcPreparedTotals(spellbook))
	const [selected, setSelected] = useState(undefined)
	const spellsPerDay = props.jobClasses[props.profile.jobClass].levels[props.profile.level].spellsPerDay

	useEffect(() => {
		setPreparedTotals(calcPreparedTotals(spellbook))
		props.startEditProfile(props.profile.id, { spellbook })
	}, [spellbook])

	const handleChange = (e) => {
		const level = e.target.getAttribute("level")
		const index = e.target.getAttribute("index")
		const valueChange = Number(e.target.getAttribute("change"))

		const spell = spellbook[level][index]
		const value = spell.prepared + valueChange
		const remaining = value - spell.used

		setSpellbook(update(spellbook, {
			[level]: {
				[index]: {
					prepared: { $set: value },
					remaining: { $set: remaining }
				}
			}
		}))
	}
	
	return (
		<div className="container container--body">
			{spellbook.map((page, level) => (
				<div className="section" key={level}>
					<h3 className="row--center">Level {level} Spells ({preparedTotals[level]}/{spellsPerDay[level]})</h3>

					<div className="grid--spells">
						<h5 className="grid__col1">Spell</h5>
						<h5 className="grid__col2">Prep</h5>
						<h5 className="grid__col3">Rmng</h5>

						{page.map((spell, index) => (
							<Fragment key={index}>
								<button 
									className="grid__col1 button--link" 
									id={spell.id}
									onClick={() => setSelected(props.spells[spell.id])}
								>
									{props.spells[spell.id].name}
								</button>

								<div className="grid__col2 grid--spells__attribute" >
									<button
										change={1}
										level={level}
										index={index}
										onClick={(e) => handleChange(e)}
									>+</button>
									<div>{spell.prepared}</div>
									<button
										change={-1}
										level={level}
										index={index}
										onClick={(e) => handleChange(e)}
									>-</button>
								</div>
								
								<div className="grid__col3">{spell.remaining}</div>

								{(spell.prepared !== 0 || spell.remaining !== 0 || spell.used !== 0) && (
									<button 
										className="grid__col4" 
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
										x
									</button>
								)}
							</Fragment>
						))}                        

					</div>
				</div>
			))}

			<SpellModal
				selected={selected}
				handleCloseModal={() => setSelected(undefined)}
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