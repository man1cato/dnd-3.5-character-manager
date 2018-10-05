import React from 'react';
import {connect} from 'react-redux';
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
    return (
      <div className="grid--profile__features-value">
        {this.props.featIds.map((featId) => (
            <button
                className="button--link"
                id={featId}
                key={featId}
                onClick={this.handleOpenModal}
            >
                {this.props.feats.find((feat) => feat.id === featId).name}
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