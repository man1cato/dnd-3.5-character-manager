import React from 'react';
import {connect} from 'react-redux';

import Header from './Header';
import FeatModal from './FeatModal';

export class ProfilePage extends React.Component {
  state = {
    selectedFeat: undefined
  }

  handlePick = (e) => {
    const featId = e.target.id;
    const selectedFeat = this.props.feats.filter((feat) => feat.id === featId)[0];
    console.log('selectedFeat', selectedFeat);
    this.setState({selectedFeat});
  }

  handleCloseModal = () => {
    this.setState({selectedFeat: undefined});
  }

  render () {
    return (
      <div>
        <Header pageTitle="Character Profile" />
        <div className="container container--body">
          <div className="grid grid--profile">
            <img className="grid--profile__img" src={this.props.profile.iconUrl} />
    
            <div className="grid--profile__name">{this.props.profile.name}</div>
            <div>{this.props.profile.race}</div>
            <div>{this.props.profile.gender}</div>
            <div>{this.props.profile.class}</div>
            <div>{this.props.profile.age} yrs</div>
            <div>{this.props.profile.alignment}</div>
            <div>{this.props.profile.height}</div>
            <div>{this.props.profile.size}</div>
            <div>{this.props.profile.weight} lbs</div>

            <h4 className="grid--profile__features-key">Languages</h4>
            <div className="grid--profile__features-value">{this.props.profile.languages}</div>

            <h4 className="grid--profile__features-key">Deity</h4>
            <div className="grid--profile__features-value">{this.props.profile.deity}</div>

            <h4 className="grid--profile__features-key">School</h4>
            <div className="grid--profile__features-value">{this.props.profile.school}</div>

            <h4 className="grid--profile__features-key">Prohibited Schools</h4>
            <div className="grid--profile__features-value">{this.props.profile.prohibitedSchools}</div>

            <h4 className="grid--profile__features-key">Special Abilities</h4>
            <div className="grid--profile__features-value">{this.props.profile.specialAbilities}</div>

            <h4 className="grid--profile__features-key">Feats</h4>
            <div className="grid--profile__features-value">
              {this.props.profile.feats.map((featId) => (
                  <button
                    id={featId}
                    onClick={this.handlePick}
                  >
                    {this.props.feats.find((feat) => feat.id === featId).name}
                  </button>
                ))}
            </div>
    
            <FeatModal 
              selectedFeat={this.state.selectedFeat}
              handleCloseModal={this.handleCloseModal}
            />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  profile: {
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
  },
  feats: state.feats
})

export default connect(mapStateToProps)(ProfilePage);
