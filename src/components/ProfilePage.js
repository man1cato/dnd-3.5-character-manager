import React from 'react';
import {connect} from 'react-redux';

export const ProfilePage = (props) => (
    <div className="container container--body">
      <div className="grid grid--profile">
        <img className="grid--profile__img" src={props.iconUrl} />

        <div className="grid--profile__name">{props.name}</div>
        <div>{props.race}</div>
        <div>{props.gender}</div>
        <div>{props.class}</div>
        <div>{props.height}</div>
        <div>{props.alignment}</div>
        <div>{props.weight} lbs</div>
        <div>Deity: {props.deity}</div>
        <div>{props.size}</div>

        <h4 className="grid--profile__features-key">Languages</h4>
        <div className="grid--profile__features-value">{props.languages}</div>
        <h4 className="grid--profile__features-key">Feats</h4>
        <div className="grid--profile__features-value">{props.feats}</div>
        <h4 className="grid--profile__features-key">Special Abilities</h4>
        <div className="grid--profile__features-value">{props.specialAbilities}</div>
        <h4 className="grid--profile__features-key">School</h4>
        <div className="grid--profile__features-value">{props.school}</div>
        <h4 className="grid--profile__features-key">Prohibited Schools</h4>
        <div className="grid--profile__features-value">{props.prohibitedSchools}</div>
      </div>
    </div>
);

const mapStateToProps = (state) => ({
  ...state.profile
})

export default connect(mapStateToProps)(ProfilePage);
