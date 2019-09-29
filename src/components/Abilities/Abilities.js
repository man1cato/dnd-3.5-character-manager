import React, { Fragment, useState, useEffect } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'

import Counter from '../Counter/Counter'
import { calcAbilityMod, convertInputValue } from '../../utils/utils'
import './Abilities.scss'

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
		<div className="Abilities">
			<h5 className="grid__col1">Ability</h5>
			<h5 className="grid__col2">Score</h5>
			<h5 className="grid__col3">Temp Score</h5>
			<h5 className="grid__col4">Mod</h5>

			{_.map(['str', 'dex', 'con', 'int', 'wis', 'cha'], (key) => {
				const score = scores[key]
				const tempScore = tempScores[key]
				return (
					<Fragment key={key}>
						<div className="grid__col1">{key.toUpperCase()}</div>
						<div className="grid__col2">{score}</div>
						<Counter
							className="grid__col3"
							value={convertInputValue(tempScore)}
							updateValue={value => setTempScores(update(tempScores, {
								[key]: { $set: convertInputValue(value) }
							}))}
						/>
						<div className="grid__col4">
							{!!tempScore ? calcAbilityMod(tempScore) : calcAbilityMod(score)}
						</div>
					</Fragment>
				)
			})}
		</div>
	)
}


export default Abilities