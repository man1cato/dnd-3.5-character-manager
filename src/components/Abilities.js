import React from 'react';

const Abilities = (props) => (
  <div className="grid grid--abilities">
    <div className="grid--abilities__ability">Ability</div>
    <div className="grid--abilities__score">Score</div>
    <div className="grid--abilities__mod">Mod</div>
    <div className="grid--abilities__tempScore">Temp Score</div>
    <div className="grid--abilities__tempMod">Temp Mod</div>
    {Object.entries(props.abilities).map((ability, i) =>
      <h4 className="grid--abilities__ability" key={i}>{ability[1].name}</h4>
    )}
    {Object.entries(props.abilities).map((ability, i) =>
      <div className="grid--abilities__score" key={i}>{ability[1].score}</div>
    )}
    {Object.entries(props.abilities).map((ability, i) =>
      <div className="grid--abilities__mod" key={i}>{ability[1].mod}</div>
    )}
    {Object.entries(props.abilities).map((ability, i) =>
      <input
      className="grid--abilities__tempScore"
      key={i}
      id={ability[0]}
      type="text"
      value={ability[1].tempScore}
      onChange={props.onTempScoreChange}
      />
    )}
    {Object.entries(props.abilities).map((ability, i) =>
      <div className="grid--abilities__tempMod" key={i}>{ability[1].tempMod}</div>
    )}
  </div>
)

export default Abilities;
