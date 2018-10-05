import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import FeatModal from './FeatModal';

export class Feats extends React.Component{
  state = {
    selected: undefined
  }  

  handleOpenModal = (e) => {
    const featId = e.target.id;
    const selected = this.props.feats.find((feat) => feat.id === featId);
    this.setState({selected});
  }

  handleCloseModal = () => {
    this.setState({selected: undefined});
  }
  
  render () {    
    const feats = _.orderBy(this.props.featIds.map((featId) => {
      return this.props.feats.find((feat) => feat.id === featId)
    }), ['name'], ['asc']);

    return (
      <div className="grid--profile__features-value">
        {feats.map((feat) => (
            <button
                className="button--link"
                id={feat.id}
                key={feat.id}
                onClick={this.handleOpenModal}
            >
                {feat.name}
            </button>
        ))}

        <FeatModal 
            selected={this.state.selected}
            handleCloseModal={this.handleCloseModal}
        />
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  feats: state.feats
});

export default connect(mapStateToProps)(Feats);