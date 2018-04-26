import React from 'react';
import {connect} from 'react-redux';

const features = [
  ["Languages", "languages"],
  ["Feats", "feats"],
  ["Special Abilities", "specialAbilities"],
  ["School", "school"],
  ["Prohibited Schools", "prohibitedSchools"],
  ["Deity", "deity"]
]

export const ProfilePage = (props) => (
    <div className="container container--body">
      <div className="grid grid--profile">
        <img className="grid--profile__img" src={props.iconUrl} />

        <div className="grid--profile__name">{props.name}</div>
        <div>{props.race}</div>
        <div>{props.gender}</div>
        <div>{props.class}</div>
        <div>{props.age} yrs</div>
        <div>{props.alignment}</div>
        <div>{props.height}</div>
        <div>{props.size}</div>
        <div>{props.weight} lbs</div>

        {features.map((feature, i) => (
          <h4 className="grid--profile__features-key" key={i}>{feature[0]}</h4>
        ))}
        {features.map((feature, i) => (
          <div className="grid--profile__features-value" key={i}>{props[feature[1]]}</div>
        ))}
      </div>
    </div>
);

const mapStateToProps = (state) => ({
  ...state.profile
})

export default connect(mapStateToProps)(ProfilePage);
