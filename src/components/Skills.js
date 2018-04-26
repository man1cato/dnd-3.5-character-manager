import React from 'react';

const Skills = (props) => (
  <div>
    <div className="grid grid--skills">
      <h4>Skill</h4>
      <h4 className="grid--skills__ranks">Ranks</h4>
      <h4>Skill</h4>
      <h4 className="grid--skills__ranks">Ranks</h4>
    </div>
    <div className="flexbox flexbox--skills">
      {props.skills.map((skill, i) => (
        <div className="flexbox flexbox--skills-item" key={i}>
          <div className="flexbox--skills-item__name">{skill.name}</div>
          <div className="flexbox--skills-item__ranks">{skill.ranks}</div>
        </div>
      ))}
    </div>
  </div>
)

export default Skills;


// <div className="grid grid--skills">
//   <h4 className="grid--skills__name">Skill</h4>
//   <h4 className="grid--skills__ranks">Ranks</h4>
//
//   {props.skills.map((skill, i) => (
//     <div className="grid--skills__name" key={i}>{skill.name}</div>
//   ))}
//   {props.skills.map((skill, i) => (
//     <div className="grid--skills__ranks" key={i}>{skill.ranks}</div>
//   ))}
// </div>
