import React from 'react'
import { connect } from 'react-redux'
import update from 'react-addons-update'

import Header from './Header'
import Footer from './Footer'
import ItemModal from './ItemModal'

import { startEditProfile } from '../actions/profile'

const totalMoney = (pp, gp, sp, cp) => (pp*10 + gp + sp/10 + cp/100).toFixed(2)
const totalValue = (items) => items.map((item) => item.totalValue).reduce((total, num) => total + num)
const totalWeight = (items) => items.map((item) => item.totalWeight).reduce((total, num) => total + num)

const denominations = ['pp', 'gp', 'sp', 'cp']

export class EquipmentPage extends React.Component {

	state = {
		money: {
			...this.props.money,
			total: totalMoney(this.props.money.pp, this.props.money.gp, this.props.money.sp, this.props.money.cp)
		},
		equipment: this.props.equipment || [],
		equipmentTotalValue: totalValue(this.props.equipment),
		equipmentTotalWeight: totalWeight(this.props.equipment),
		selected: undefined
	}

	handleChange = (e) => {
		const id = e.target.id
		const name = e.target.name
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

			const qty = isNaN(value) ? prevState.equipment[id].qty : value;

			let totalValue = prevState.equipment[id].unitValue * qty;
			totalValue = Number.isInteger(totalValue) ? totalValue : Number(totalValue.toFixed(1));

			let totalWeight = prevState.equipment[id].unitWeight * qty;
			totalWeight = Number.isInteger(totalWeight) ? totalWeight : Number(totalWeight.toFixed(1));

			let equipment = prevState.equipment;
			equipment[id].qty = qty;
			equipment[id].totalValue = totalValue;
			equipment[id].totalWeight = totalWeight;
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
					equipmentTotalValue: totalValue(prevState.equipment),
					equipmentTotalWeight: totalWeight(prevState.equipment)
				}
			}, () => {
				this.props.startEditProfile(this.props.id, { [name]: this.state[name] });
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
			<div className="layout">
				<Header pageTitle="Equipment" />
				<div className="container container--body">
					
					<div className="grid grid--money">
						{denominations.map((denomination) => (
							<div className="grid--money__cell">
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

					<div className="row row--right">
						<h4>Total money: {this.state.money.total} gp</h4> 
					</div>
					
					<div className="grid grid--items">
						<h5 className="grid__col1">Item</h5>
						<h5>Qty</h5>
						<h5>Value</h5>
						<h5>Weight</h5>  

						{this.state.equipment.map((item, i) => (
							<button 
								className="grid__col1 button--link" 
								id={item.id}
								key={item.id}
								onClick={this.handleOpenModal}
							>
								{item.name}
							</button>                                
						))}
						{this.state.equipment.map((item, i) => (
							<input 
								className="grid__col2" 
								key={i}
								id={i}
								name="equipment"
								value={item.qty}
								onChange={this.handleChange}
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

					{/* <button>Add New Item</button> */}

					<ItemModal 
						selected={this.state.selected} 
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
	items: state.items
})
  
const mapDispatchToProps = (dispatch, props) => ({
	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
});
  
  
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPage)