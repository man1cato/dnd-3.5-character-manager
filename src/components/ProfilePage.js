import React from 'react';
import {connect} from 'react-redux';

export const ProfilePage = (props) => (
    <div className="container grid grid--profile">
        <div className="grid--profile__img">
        </div>
        <div className="grid--profile__name">{props.name}</div>
        <div className="grid--profile__specs">
          <div>{props.race}</div>
          <div>{props.gender}</div>
        </div>
        <div className="grid--profile__specs">
          <div>{props.class}</div>
          <div>{props.height}</div>
        </div>
        <div className="grid--profile__specs">
          <div>{props.alignment}</div>
          <div>{props.weight} lbs</div>
        </div>
        <div className="grid--profile__specs">
          <div>Deity: {props.deity}</div>
          <div>{props.size}</div>
        </div>
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
);

const mapStateToProps = (state) => ({
  ...state.profile
})

export default connect(mapStateToProps)(ProfilePage);
