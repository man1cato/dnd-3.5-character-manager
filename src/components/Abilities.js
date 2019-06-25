import React from 'react'
import _ from 'lodash'
import { calcAbilityMod } from '../utils/utils'


const Abilities = ({ abilities, handleChange }) => {
	const keys = _.keys(abilities)

	return (
		<div className="grid grid--abilities">
			<h5 className="grid__col1">Ability</h5>
			{_.map(keys, (ability, i) =>
				<div className="grid__col1" key={`ability${i}`}>{ability.toUpperCase()}</div>
			)}
	
			<h5 className="grid__col2">Score</h5>
			{_.map(keys, (ability, i) =>
				<div className="grid__col2" key={`score${i}`}>{abilities[ability].score}</div>
			)}
	
			<h5 className="grid__col3">Mod</h5>
			{_.map(keys, (ability, i) =>
				<div className="grid__col3" key={`mod${i}`}>{calcAbilityMod(abilities[ability].score)}</div>
			)}
	
			<h5 className="grid__col4">Temp Score</h5>
			{_.map(keys, (ability, i) =>
				<input
					className="grid__col4"
					key={`tempScore${i}`}
					id={ability}
					name="abilities"
					type="text"
					value={abilities[ability].tempScore}
					onChange={handleChange}
				/>
			)}
	
			<h5 className="grid__col5">Temp Mod</h5>
			{_.map(keys, (ability, i) =>
				<div className="grid__col5" key={`tempMod${i}`}>{!!abilities[ability].tempScore && calcAbilityMod(abilities[ability].tempScore)}</div>
			)}
		</div>
	)
} 

export default Abilities