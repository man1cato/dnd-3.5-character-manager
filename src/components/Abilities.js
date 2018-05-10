import React from 'react';

const Abilities = ({ abilities, onTempScoreChange }) => (
  <div className="grid grid--abilities">
    <h4 className="grid__col1">Ability</h4>
    <h4 className="grid__col2">Score</h4>
    <h4 className="grid__col3">Mod</h4>
    <h4 className="grid__col4">Temp Score</h4>
    <h4 className="grid__col5">Temp Mod</h4>
    {Object.entries(abilities).map((ability, i) =>
      <div className="grid__col1" key={i}>{ability[1].name}</div>
    )}
    {Object.entries(abilities).map((ability, i) =>
      <div className="grid__col2" key={i}>{ability[1].score}</div>
    )}
    {Object.entries(abilities).map((ability, i) =>
      <div className="grid__col3" key={i}>{ability[1].mod}</div>
    )}
    {Object.entries(abilities).map((ability, i) =>
      <input
        className="grid__col4"
        key={i}
        id={ability[0]}
        type="text"
        value={ability[1].tempScore}
        onChange={onTempScoreChange}
      />
    )}
    {Object.entries(abilities).map((ability, i) =>
      <div className="grid__col5" key={i}>{ability[1].tempMod}</div>
    )}
  </div>
)

export default Abilities;
