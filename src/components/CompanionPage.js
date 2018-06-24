import React from 'react';

import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import Skills from './Skills';
import Saves from './Saves';
import { startEditProfile } from '../actions/profile';


export class CompanionPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentWillUnmount() {
        this.props.startEditProfile(this.props.id, this.state);
    }

    render() {
        return (
            <div>
                <Header pageTitle="Companion" />
                <div className="container container--body">
                    <div className="grid grid--companion">
                        <h3>{this.props.name}</h3>
                        <div>{this.props.type}</div>
                        <h4>Feats</h4>
                        <div>{this.props.feats}</div>
                        <h4>Special Abilities</h4>
                        <div>{this.props.specialAbilities}</div>
                        <h4>Features</h4>
                        <div>{this.props.features}</div>                        
                    </div>

                    <div className="grid grid--abilities">
                        <h4 className="grid__col1">Ability</h4>
                        <h4 className="grid__col2">Score</h4>
                        <h4 className="grid__col3">Mod</h4>
                        {Object.entries(this.props.abilities).map((ability, i) =>
                            <div className="grid__col1" key={i}>{ability[1].name}</div>
                        )}
                        {Object.entries(this.props.abilities).map((ability, i) =>
                            <div className="grid__col2" key={i}>{ability[1].score}</div>
                        )}
                        {Object.entries(this.props.abilities).map((ability, i) =>
                            <div className="grid__col3" key={i}>{ability[1].mod}</div>
                        )}
                    </div>

                    <Skills skills={this.props.skills}/>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
    ...state.profile.companion
})

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CompanionPage)