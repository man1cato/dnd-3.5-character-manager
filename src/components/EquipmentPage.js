import React from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';

import Header from './Header';
import ItemModal from './ItemModal';

import { startEditProfile } from '../actions/profile';


export class EquipmentPage extends React.Component {
    constructor(props) {
        super(props);
        
        const moneyTotal = this.props.money.pp*10 + this.props.money.gp + this.props.money.sp/10 + this.props.money.cp/100;
         
        const equipmentTotalValue = this.props.equipment.map((item) => item.totalValue).reduce((total, num) => {
            return total + num;
        });
        const equipmentTotalWeight = this.props.equipment.map((item) => item.totalWeight).reduce((total, num) => {
            return total + num;
        });
        
        this.state = {
            money: {
                ...this.props.money,
                total: moneyTotal
            },
            equipment: this.props.equipment || [],
            equipmentTotalValue,
            equipmentTotalWeight,
            selected: undefined
        }
    }

    componentWillUnmount() {
        this.props.startEditProfile(this.props.id, {
            money: this.state.money,
            equipment: this.state.equipment,
            equipmentTotalValue: this.state.equipmentTotalValue,
            equipmentTotalWeight: this.state.equipmentTotalWeight
        });
    }

    handleMoneyChange = (e) => {
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

    handleItemQtyChange = (e) => {
        const index = e.target.id;
        let qty = Number(e.target.value);        

        this.setState((prevState) => {
            qty = isNaN(qty) ? prevState.equipment[index].qty : qty;

            let totalValue = prevState.equipment[index].unitValue * qty;
            totalValue = Number.isInteger(totalValue) ? totalValue : Number(totalValue.toFixed(1));

            let totalWeight = prevState.equipment[index].unitWeight * qty;
            totalWeight = Number.isInteger(totalWeight) ? totalWeight : Number(totalWeight.toFixed(1));

            let equipment = prevState.equipment;
            equipment[index].qty = qty;
            equipment[index].totalValue = totalValue;
            equipment[index].totalWeight = totalWeight;
            return { equipment } 
        }, () => {
            this.setState((prevState) => {
                const equipmentTotalValue = prevState.equipment.map((item) => item.totalValue).reduce((total, num) => {
                    return total + num;
                });
                const equipmentTotalWeight = prevState.equipment.map((item) => item.totalWeight).reduce((total, num) => {
                    return total + num;
                });
                return {
                    equipmentTotalValue,
                    equipmentTotalWeight
                }
            })
        })
    }

    handleOpenModal = (e) => {
        const itemId = e.target.id;
        const selected = this.props.items.find((item) => item.id === itemId);
        this.setState({selected});
    }

    handleCloseModal = () => {
        this.setState({selected: undefined});
    }

    render () {
        return (
            <div>
                <Header pageTitle="Equipment" />
                <div className="container container--body">
                    
                    <div className="row row--left">
                        <h4>Total money: </h4> <div>{this.state.money.total} gp</div> 
                    </div>
                    <div className="grid grid--money">
                        <div className="grid--money__cell">
                            <input
                                type="text"
                                name="money"
                                id="pp"
                                value={this.state.money.pp}
                                onChange={this.handleMoneyChange}
                            />  
                            <div>pp</div>
                        </div>
                        <div className="grid--money__cell">
                            <input
                                type="text"
                                name="money"
                                id="gp"
                                value={this.state.money.gp}
                                onChange={this.handleMoneyChange}
                            />  
                            <div>gp</div>
                        </div>
                        <div className="grid--money__cell">
                            <input
                                type="text"
                                name="money"
                                id="sp"
                                value={this.state.money.sp}
                                onChange={this.handleMoneyChange}
                            />  
                            <div>sp</div>
                        </div>
                        <div className="grid--money__cell">
                            <input
                                type="text"
                                name="money"
                                id="cp"
                                value={this.state.money.cp}
                                onChange={this.handleMoneyChange}
                            />  
                            <div>cp</div>            
                        </div>
                    </div>

                    
                    <div className="grid grid--items">
                        <h5 className="grid__col1">Item</h5>
                        <h5>Qty</h5>
                        <h5>Value</h5>
                        <h5>Weight</h5>  

                        {this.state.equipment.map((item, i) => (
                            <button 
                                className="grid__col1" 
                                id={item.id}
                                key={item.id}
                                onClick={this.handleOpenModal}
                            >{item.name}</button>                                
                        ))}
                        {this.state.equipment.map((item, i) => (
                            <input 
                                className="grid__col2" 
                                key={i}
                                id={i}
                                name="items"
                                value={item.qty}
                                onChange={this.handleItemQtyChange}
                            />                                
                        ))}
                        {this.state.equipment.map((item, i) => (
                            <div className="grid__col3" key={i}>{item.totalValue} gp</div>
                        ))}
                        {this.state.equipment.map((item, i) => (
                            <div className="grid__col4" key={i}>{item.totalWeight} lbs</div> 
                        ))}

                        <div className="grid__col1 grid--items__totals">Totals</div>
                        <div className="grid__col3 grid--items__totals">{this.state.equipmentTotalValue} gp</div>
                        <div className="grid__col4 grid--items__totals">{this.state.equipmentTotalWeight} lbs</div>

                    </div>

                    <button>Add New Item</button>

                    <ItemModal 
                        selected={this.state.selected} 
                        handleCloseModal={this.handleCloseModal}
                    />

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.profile.id,
    money: state.profile.money,
    equipment: state.profile.equipment,
    items: state.items
  })
  
  const mapDispatchToProps = (dispatch, props) => ({
    startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
  });
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPage)