import React, { Fragment } from 'react'
import _ from 'lodash'
import { calcAbilityMod } from '../utils/utils'


const Abilities = ({ abilities, handleChange }) => (
	<div className="grid--abilities">
		<h5 className="grid__col1">Ability</h5>
		<h5 className="grid__col2">Score</h5>
		<h5 className="grid__col3">Temp Score</h5>
		<h5 className="grid__col4"> Mod</h5>

		{_.map(_.keys(abilities), (ability, i) => (
			<Fragment key={i}>
				<div className="grid__col1">{ability.toUpperCase()}</div>
				<div className="grid__col2">{abilities[ability].score}</div>
				<input
					className="grid__col3"
					id={ability}
					name="abilities"
					type="number"
					value={abilities[ability].tempScore}
					onChange={handleChange}
				/>
				<div className="grid__col4">
					{!!abilities[ability].tempScore ? calcAbilityMod(abilities[ability].tempScore) : calcAbilityMod(abilities[ability].score)}
				</div>
			</Fragment>
		))}
	</div>
)


export default Abilities