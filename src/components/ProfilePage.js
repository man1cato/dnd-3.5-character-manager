import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Feats from './Feats';
import SpecialAbilities from './SpecialAbilities';

const ProfilePage = (props) => (
  <div className="layout">
    <Header pageTitle="Character Profile" />

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

        <h4 className="grid--profile__features-key">Languages</h4>
        <div className="grid--profile__features-value">{props.languages}</div>

        <h4 className="grid--profile__features-key">Deity</h4>
        <div className="grid--profile__features-value">{props.deity}</div>

        <h4 className="grid--profile__features-key">School</h4>
        <div className="grid--profile__features-value">{props.school}</div>

        <h4 className="grid--profile__features-key">Prohibited Schools</h4>
        <div className="grid--profile__features-value">{props.prohibitedSchools}</div>

        <h4 className="grid--profile__features-key">Special Abilities</h4>
        <div className="grid--profile__features-value">
          <SpecialAbilities specialAbilityIds={props.specialAbilities} />
        </div>

        <h4 className="grid--profile__features-key">Feats</h4>
        <Feats featIds={props.feats} />
      </div>
    </div>

    <Footer />
  </div>
);



const mapStateToProps = (state) => ({
  name: state.profile.name,
  race: state.profile.race,
  gender: state.profile.gender,
  class: state.profile.class,
  age: state.profile.age,
  alignment: state.profile.alignment,
  height: state.profile.height,
  size: state.profile.size,
  weight: state.profile.weight,
  languages: state.profile.languages,
  feats: state.profile.feats,
  specialAbilities: state.profile.specialAbilities,
  school: state.profile.school,
  prohibitedSchools: state.profile.prohibitedSchools,
  deity: state.profile.deity,
  iconUrl: state.profile.iconUrl
})

export default connect(mapStateToProps)(ProfilePage);
