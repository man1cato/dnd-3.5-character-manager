import React from 'react';

import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import { startEditProfile } from '../actions/profile';


export class CompanionPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companion: this.props.companion
        }
    }

    componentWillUnmount() {
        this.props.startEditProfile(this.props.id, this.state);
    }

    render() {
        return (
            <div>
                <Header pageTitle="Companion" />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
    companion: state.profile.companion
})

const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});


export default connect(mapStateToProps, mapDispatchToProps)(CompanionPage)