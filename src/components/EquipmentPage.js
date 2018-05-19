import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import Money from './Money';

import { startEditProfile } from '../actions/profile';


export class EquipmentPage extends React.Component {
    constructor(props) {
        super(props);
        
        const total = this.props.money.pp*10 + this.props.money.gp + this.props.money.sp/10 + this.props.money.cp/100;

        this.state = {
            money: {
              ...this.props.money,
            total
            },
            items: this.props.items
        }
    }

    componentWillUnmount() {
        this.props.startEditProfile(this.props.id, this.state);
    }

    onInputChange = (e) => {
        const name = e.target.name;
        const id = e.target.id;
        let value = Number(e.target.value);
        value = (value === 0 || isNaN(value)) ? "" : value;
        this.setState((prevState) => ({ 
            [name]: update(prevState[name], {
                [id]: {$set: value}
            })            
        }))
    }

    render () {
        return (
            <div>
                <Header pageTitle="Equipment" />
                <div className="container container--body">
                    
                    <Money 
                        money={this.state.money} 
                        onInputChange={this.onInputChange}
                    />

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
    money: state.profile.money,
    items: state.profile.items
  })
  
  const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPage)