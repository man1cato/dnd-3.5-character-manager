import React from 'react';

const Skills = (props) => {
  const skillCount = props.skills.length;
  const col1 = props.skills.slice(0, Math.ceil(skillCount / 2));
  const col2 = props.skills.slice(Math.ceil(skillCount / 2));

  return (
    <div className="grid grid--skills">
      <h4>Skill</h4>
      <h4 className="grid--skills__ranks">Ranks</h4>
      <h4>Skill</h4>
      <h4 className="grid--skills__ranks">Ranks</h4>
        
      {col1.map((skill, i) => (        
        <div className="grid--skills__name--col1" key={i}>{skill.name}</div>
      ))}
      {col1.map((skill, i) => (
        <div className="grid--skills__ranks--col1" key={i}>{skill.ranks}</div>
      ))}
      {col2.map((skill, i) => (
        <div className="grid--skills__name--col2" key={i}>{skill.name}</div>
      ))}
      {col2.map((skill, i) => (
        <div className="grid--skills__ranks--col2" key={i}>{skill.ranks}</div>
      ))}
    </div>
  )
}

export default Skills;