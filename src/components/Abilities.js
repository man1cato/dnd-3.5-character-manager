import React, { Fragment, useState, useEffect } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'

import { calcAbilityMod, convertInputValue } from '../utils/utils'


const Abilities = ({ abilities, handleUpdate }) => {
	const scores = _.mapValues(abilities, (obj) => obj.score)
	const [tempScores, setTempScores] = useState(_.mapValues(abilities, (obj) => obj.tempScore))

	useEffect(() => {
		handleUpdate({ 
			abilities: _.mapValues(tempScores, (val, key) => ({
				score: scores[key],
				tempScore: val
			})) 
		})
	}, [tempScores])

	return (
		<div className="grid--abilities">
			<h5 className="grid__col1">Ability</h5>
			<h5 className="grid__col2">Score</h5>
			<h5 className="grid__col3">Temp Score</h5>
			<h5 className="grid__col4">Mod</h5>

			{_.map(['str', 'dex', 'con', 'int', 'wis', 'cha'], (key) => (
				<Fragment key={key}>
					<div className="grid__col1">{key.toUpperCase()}</div>
					<div className="grid__col2">{scores[key]}</div>
					<input
						className="grid__col3"
						id={key}
						name="abilities"
						type="number"
						value={convertInputValue(tempScores[key])}
						onChange={(e) => {
							setTempScores(update(tempScores, {
								[key]: { $set: Number(e.target.value)}
							}))
						}}
					/>
					<div className="grid__col4">
						{!!tempScores[key] ? calcAbilityMod(tempScores[key]) : calcAbilityMod(scores[key])}
					</div>
				</Fragment>
			))}
		</div>
	)
}


export default Abilities