import React from 'react';

const Abilities = ({ abilities, handleChange }) => (
	<div className="grid grid--abilities">
		<h5 className="grid__col1">Ability</h5>
		{Object.keys(abilities).map((ability, i) =>
			<div className="grid__col1" key={i}>{abilities[ability].name}</div>
		)}

		<h5 className="grid__col2">Score</h5>
		{Object.keys(abilities).map((ability, i) =>
			<div className="grid__col2" key={i}>{abilities[ability].score}</div>
		)}

		<h5 className="grid__col3">Mod</h5>
		{Object.keys(abilities).map((ability, i) =>
			<div className="grid__col3" key={i}>{abilities[ability].mod}</div>
		)}

		<h5 className="grid__col4">Temp Score</h5>
		{Object.keys(abilities).map((ability, i) =>
			<input
			className="grid__col4"
			key={i}
			id={ability}
			name="abilities"
			type="text"
			value={abilities[ability].tempScore}
			onChange={handleChange}
			/>
		)}

		<h5 className="grid__col5">Temp Mod</h5>
		{Object.keys(abilities).map((ability, i) =>
			<div className="grid__col5" key={i}>{abilities[ability].tempMod}</div>
		)}
	</div>
)

export default Abilities;
