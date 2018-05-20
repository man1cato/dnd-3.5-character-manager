import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import Money from './Money';
import Items from './Items';

import { startEditProfile } from '../actions/profile';


export class EquipmentPage extends React.Component {
    constructor(props) {
        super(props);
        
        const moneyTotal = this.props.money.pp*10 + this.props.money.gp + this.props.money.sp/10 + this.props.money.cp/100;
         
        const itemsTotalValue = this.props.items.map((item) => item.totalValue).reduce((total, num) => {
            return total + num;
        });
        const itemsTotalWeight = this.props.items.map((item) => item.totalWeight).reduce((total, num) => {
            return total + num;
        });
        
        this.state = {
            money: {
                ...this.props.money,
                total: moneyTotal
            },
            items: this.props.items || [],
            itemsTotalValue,
            itemsTotalWeight
        }
    }

    componentWillUnmount() {
        this.props.startEditProfile(this.props.id, this.state);
    }

    onMoneyChange = (e) => {
        const id = e.target.id;
        let value = Number(e.target.value);      
        
        this.setState((prevState) => {            
            value = isNaN(value) ? prevState.money[id] : value;
            return {
                money: update(prevState.money, {
                    [id]: {$set: value}
                })            
            }
        }, () => {
            this.setState((prevState) => {  
                const total = prevState.money.pp*10 + prevState.money.gp + prevState.money.sp/10 + prevState.money.cp/100;
                return {
                    money: update(prevState.money, {
                        total: {$set: total.toFixed(2)}
                    })
                }
            })
        })     
    }

    onItemQtyChange = (e) => {
        const index = e.target.id;
        let qty = Number(e.target.value);        

        this.setState((prevState) => {
            qty = isNaN(qty) ? prevState.items[index].qty : qty;

            let totalValue = prevState.items[index].unitValue * qty;
            totalValue = Number.isInteger(totalValue) ? totalValue : Number(totalValue.toFixed(1));

            let totalWeight = prevState.items[index].unitWeight * qty;
            totalWeight = Number.isInteger(totalWeight) ? totalWeight : Number(totalWeight.toFixed(1));

            let items = prevState.items;
            items[index].qty = qty;
            items[index].totalValue = totalValue;
            items[index].totalWeight = totalWeight;
            return { items } 
        }, () => {
            this.setState((prevState) => {
                const itemsTotalValue = prevState.items.map((item) => item.totalValue).reduce((total, num) => {
                    return total + num;
                });
                const itemsTotalWeight = prevState.items.map((item) => item.totalWeight).reduce((total, num) => {
                    return total + num;
                });
                return {
                    itemsTotalValue,
                    itemsTotalWeight
                }
            })
        })
    }

    render () {
        return (
            <div>
                <Header pageTitle="Equipment" />
                <div className="container container--body">
                    
                    <Money 
                        money={this.state.money} 
                        onInputChange={this.onMoneyChange}
                    />
                    <br></br>
                    <Items 
                        items={this.state.items}
                        itemsTotalValue={this.state.itemsTotalValue}
                        itemsTotalWeight={this.state.itemsTotalWeight}
                        onInputChange={this.onItemQtyChange}
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