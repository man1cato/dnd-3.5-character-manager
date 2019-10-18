import React, { Fragment, useState, useEffect } from 'react'
import update from 'immutability-helper'

import SpellModal from '../Modals/SpellModal'
import './PreparedSpells.scss'


const listPreparedSpells = (spellbook) => {
	let preparedSpells = []
	spellbook.forEach((page) => {
		const filteredSpells = page.filter((spell) => spell.prepared > 0)
		filteredSpells.forEach((spell) => preparedSpells.push(spell))         
	})
	return preparedSpells
}

export const PreparedSpells = (props) => {
	const [spellbook, setSpellbook] = useState(props.spellbook)
	const [preparedSpells, setPreparedSpells] = useState(listPreparedSpells(spellbook))
	const [castSpells, setCastSpells] = useState([])
	const [clickedSpell, setClickedSpell] = useState(null)

	useEffect(() => {
		setPreparedSpells(listPreparedSpells(spellbook))
		props.handleUpdate({ spellbook })
	}, [spellbook])

	const handleChange = (e) => {
		const level = e.target.getAttribute("level")
		const spellId = e.target.getAttribute("spellid")
		const index = props.spellbook[level].findIndex((spell) => spell.id === spellId)
		const valueChange = Number(e.target.getAttribute("change"))
		
		const spell = spellbook[level][index]
		const used = spell.used + valueChange
		const remaining = spell.prepared - used
		
		if (valueChange > 0) {
			setCastSpells([...castSpells, spellId])
		} else {
			setCastSpells(castSpells.filter((id) => id !== spellId))
		}

		setSpellbook(update(spellbook, {
			[level]: {
				[index]: {
					used: { $set: used },
					remaining: { $set: remaining }
				}			
			}
		}))
	}
  
	return (
		<>
			<div className="PreparedSpells__grid">
				<h5 className="grid__col1">Spell</h5>
				<h5 className="grid__col2">Rmng</h5>

				{preparedSpells.map((spell, i) => (
					<Fragment key={i}>						
						<button 
							className="grid__col1 button--link"                         
							data-testid={spell.id}
							type='button'
							onClick={() => setClickedSpell(props.spells[spell.id])}
						>
							{props.spells[spell.id].name}
						</button>
			
						<div 
							className="grid__col2" 
							data-testid={`${spell.id}Remaining`}
						>
							{spell.remaining}
						</div>

						{castSpells.includes(spell.id) && (
							<button 
								className="grid__col3"
								data-testid={`${spell.id}UndoButton`}
								spellid={spell.id}
								level={spell.level}
								change={-1}
								onClick={(e) => handleChange(e)}
							>
								Undo
							</button>
						)}
						
						{spell.remaining > 0 && (
							<button 
								className="grid__col4"
								data-testid={`${spell.id}CastButton`}
								spellid={spell.id}
								level={spell.level}
								change={1}
								onClick={(e) => handleChange(e)}
							>
								Cast
							</button>
						)}                     
					</Fragment>
				))}
			</div>

			<SpellModal 
				clickedSpell={clickedSpell}
				handleCloseModal={() => setClickedSpell(null)}
			/>   
		</>
	)
}


export default PreparedSpells