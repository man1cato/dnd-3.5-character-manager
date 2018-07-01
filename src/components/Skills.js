import React from 'react';

const Skills = ({skills}) => {
  const skillCount = skills.length;
  const col1 = skills.slice(0, Math.ceil(skillCount / 2));
  const col2 = skills.slice(Math.ceil(skillCount / 2));

  return (
    <div className="grid grid--skills">
      <h5 className="grid--skills__name">Skill</h5>
      {col1.map((skill, i) => (        
        <div className="grid__col1 grid--skills__name" key={i}>{skill.name}</div>
      ))}

      <h5>Ranks</h5>
      {col1.map((skill, i) => (
        <div className="grid__col2" key={i}>{skill.ranks}</div>
      ))}
      
      <h5 className="grid--skills__name">Skill</h5>
      {col2.map((skill, i) => (
        <div className="grid__col3 grid--skills__name" key={i}>{skill.name}</div>
      ))}
      
      <h5>Ranks</h5>        
      {col2.map((skill, i) => (
        <div className="grid__col4" key={i}>{skill.ranks}</div>
      ))}
    </div>
  )
}

export default Skills;