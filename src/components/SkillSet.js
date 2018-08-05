import React from 'react';
import SkillModal from './SkillModal';

const SkillSet = ({skillSet, selectedSkill, handlePick, handleCloseModal}) => {
  const skillCount = skillSet.length;
  const col1 = skillSet.slice(0, Math.ceil(skillCount / 2));
  const col2 = skillSet.slice(Math.ceil(skillCount / 2));

  return (
    <div className="grid grid--skills">
      <h5 className="grid--skills__name">Skill</h5>
      {col1.map((skill, i) => (        
        <button 
          id={skill.id}
          className="grid__col1 grid--skills__name" 
          key={i}
          onClick={handlePick}
        >
          {skill.name}
        </button>
      ))}

      <h5>Ranks</h5>
      {col1.map((skill, i) => (
        <div className="grid__col2" key={i}>{skill.ranks}</div>
      ))}
      
      <h5 className="grid--skills__name">Skill</h5>
      {col2.map((skill, i) => (
        <button 
          id={skill.id}
          className="grid__col3 grid--skills__name" 
          key={i}
          onClick={handlePick}
        >
          {skill.name}
        </button>
      ))}
      
      <h5>Ranks</h5>        
      {col2.map((skill, i) => (
        <div className="grid__col4" key={i}>{skill.ranks}</div>
      ))}

      <SkillModal 
        selectedSkill={selectedSkill}
        handleCloseModal={handleCloseModal}
      />
    </div>
  )
}

export default SkillSet;