import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'

import Header from './Header'
import Footer from './Footer'
import ItemModal from './ItemModal'

import { startEditProfile } from '../actions/profile'
import { findItemById } from '../utils/utils'

const totalMoney = (pp, gp, sp, cp) => Number((pp*10 + gp + sp/10 + cp/100).toFixed(2))
const totalItemValue = (item, qty) => {
	const totalValue = item.value * qty
	return isNaN(totalValue) ? 0 : Number(totalValue.toFixed(1))
}
const totalItemWeight = (item, qty) => {
	const totalWeight = item.weight * qty
	return isNaN(totalWeight) ? 0 : Number(totalWeight.toFixed(1))
}
const totalEquipmentValue = (items) => items.map((item) => item.totalValue).reduce((total, num) => total + num)
const totalEquipmentWeight = (items) => items.map((item) => item.totalWeight).reduce((total, num) => total + num)

const denominations = ['pp', 'gp', 'sp', 'cp']

export class EquipmentPage extends React.Component {
	constructor(props) {
		super(props)

		const equipment = this.props.equipment.map((item) => ({
			...item,
			totalValue: totalItemValue(this.props.items[item.id], item.qty),
			totalWeight: totalItemWeight(this.props.items[item.id], item.qty)
		})) || []

		const equipmentTotalValue = totalEquipmentValue(equipment) || 0
		const	equipmentTotalWeight = totalEquipmentWeight(equipment) || 0

		this.state = {
			money: {
				...this.props.money,
				total: totalMoney(this.props.money.pp, this.props.money.gp, this.props.money.sp, this.props.money.cp)
			},
			equipment,
			equipmentTotalValue,
			equipmentTotalWeight,
			selected: undefined,
			equipped: {
				weapons: this.props.equipped.weapons || [],
				armor: this.props.equipped.armor || null,
				shield: this.props.equipped.shield || null
			}
		}
	}

	handleChange = (e) => {
		const id = e.target.id
		const name = e.target.name
		const index = e.target.getAttribute('index')
		let value = Number(e.target.value)

		this.setState((prevState) => {
			if (name === 'money') {
				value = isNaN(value) ? prevState.money[id] : value;
				return {
					money: update(prevState.money, {
						[id]: {$set: value}
					})            
				}
			}

			const qty = isNaN(value) ? prevState.equipment[index].qty : value
			let equipment = prevState.equipment
			equipment[index].qty = qty
			equipment[index].totalValue = totalItemValue(this.props.items[id], qty)
			equipment[index].totalWeight = totalItemWeight(this.props.items[id], qty)
			return { equipment }
		}, () => {
			this.setState((prevState) => {
				if (name === 'money') {
					const total = totalMoney(prevState.money.pp, prevState.money.gp, prevState.money.sp, prevState.money.cp)
					return {
						money: update(prevState.money, {
							total: {$set: total}
						})
					}
				}

				return {
					equipmentTotalValue: totalEquipmentValue(prevState.equipment),
					equipmentTotalWeight: totalEquipmentWeight(prevState.equipment)
				}
			}, () => {
				if (name === 'money') {
					this.props.startEditProfile(this.props.id, { money: this.state.money })
				}

				this.props.startEditProfile(this.props.id, { 
					equipment: this.state.equipment.map((item) => ({
						id: item.id,
						qty: item.qty
					}))
				})
			})
		})
	}

	handleEquip = (e) => {
		const id = e.target.id
		const category = e.target.name
		this.setState((prevState) => {
			const alreadyEquipped = _.includes(prevState.equipped[category], id) 
			console.log('alreadyEquipped', alreadyEquipped)
			if(category === 'weapons') {
				const weapons = alreadyEquipped ? _.without(prevState.equipped.weapons, id) : [...prevState.equipped.weapons, id]
				return {
					equipped: update(prevState.equipped, {
						weapons: { $set: weapons }
					})
				}
			} 
			return {
				equipped: update(prevState.equipped, {
					[category]: { $set: alreadyEquipped ? null : id }
				})
			}
			
		}, () => {
			this.props.startEditProfile(this.props.id, {
				equipped: this.state.equipped
			})
		})
	}

	handleOpenModal = (e) => {
		const id = e.target.id
		const selected = { id, ...this.props.items[id] }
		this.setState({selected})
	}

	handleCloseModal = () => {
		this.setState({selected: undefined})
	}

	render () {
		return (
			<div className="layout">
				<Header pageTitle="Equipment" />
				<div className="container container--body">
					
					<div className="grid grid--money">
						{denominations.map((denomination, i) => (
							<div className="grid--money__cell" key={`denomination${i}`}>
								<input
									type="text"
									name="money"
									id={denomination}
									value={this.state.money[denomination]}
									onChange={this.handleChange}
								/>  
								<div>{denomination}</div>
							</div>
						))}
					</div>

					<div className="row--right">
						<h4>Total money: {this.state.money.total} gp</h4> 
					</div>
					
					<div className="grid grid--items">
						<h5 className="grid__col1">Item</h5>
						<h5>Qty</h5>
						<h5>Value</h5>
						<h5>Weight</h5>  

						{this.state.equipment.map((item, i) => (
							<Fragment key={i}>
								<button 
									className="grid__col1 button--link" 
									id={item.id}
									onClick={this.handleOpenModal}
								>
									{this.props.items[item.id].name}
								</button>                                
								<input 
									className="grid__col2" 
									id={item.id}
									index={i}
									name="equipment"
									value={item.qty}
									onChange={this.handleChange}
								/>                                
								<div className="grid__col3">{item.totalValue} gp</div>
								<div className="grid__col4">{item.totalWeight} lbs</div> 
							</Fragment>
						))}

						<div className="grid__col1 grid--items__totals">Totals</div>
						<div className="grid__col3 grid--items__totals">{this.state.equipmentTotalValue} gp</div>
						<div className="grid__col4 grid--items__totals">{this.state.equipmentTotalWeight} lbs</div>

					</div>

					{/* <button>Add New Item</button> */}

					<ItemModal 
						selected={this.state.selected} 
						equipped={this.state.equipped}
						handleEquip={this.handleEquip}
						handleCloseModal={this.handleCloseModal}
						/>

				</div>
				<Footer />
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	id: state.profile.id,
	money: state.profile.money,
	equipment: state.profile.equipment,
	equipped: state.profile.equipped,
	items: state.items
})
  
const mapDispatchToProps = (dispatch, props) => ({
	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPage)