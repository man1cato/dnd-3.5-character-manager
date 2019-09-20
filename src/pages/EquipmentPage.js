import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import _ from 'lodash'

import ItemModal from '../components/ItemModal'
import { startEditProfile } from '../store/actions/profile'
import { 
	calcTotalMoney, calcItemTotalValue, calcItemTotalWeight, 
	calcEquipmentTotalValue, calcEquipmentTotalWeight 
} from '../utils/utils'


// const calcEquipmentTotalValue = (equipment) => equipment.map((item) => item.totalValue).reduce((total, num) => total + num)
// const calcEquipmentTotalWeight = (equipment) => equipment.map((item) => item.totalWeight).reduce((total, num) => total + num)

const denominations = ['pp', 'gp', 'sp', 'cp']

export const EquipmentPage = (props) => {
	const [money, setMoney] = useState(props.money)
	const [totalMoney, setTotalMoney] = useState(calcTotalMoney(money))
	
	const [equipment, setEquipment] = useState(props.equipment.map((item) => ({
		...item,
		totalValue: calcItemTotalValue(props.items[item.id], item.qty),
		totalWeight: calcItemTotalWeight(props.items[item.id], item.qty)
	})) || [])

	const [equipmentTotalValue, setEquipmentTotalValue] = useState(calcEquipmentTotalValue(equipment, props.items) || 0)
	const [equipmentTotalWeight, setEquipmentTotalWeight] = useState(calcEquipmentTotalWeight(equipment, props.items) || 0)

	const [equipped, setEquipped] = useState({
		weapons: props.equipped.weapons || [],
		armor: props.equipped.armor || null,
		shield: props.equipped.shield || null
	})
	
	const [selected, setSelected] = useState(undefined)

	useEffect(() => {
		setTotalMoney(calcTotalMoney(money))
		props.startEditProfile(props.id, { money })
	}, [money])

	useEffect(() => {
		setEquipmentTotalValue(calcEquipmentTotalValue(equipment, props.items))
		setEquipmentTotalWeight(calcEquipmentTotalWeight(equipment, props.items))
		props.startEditProfile(props.id, { equipment: _.map(equipment, (item) => ({ id: item.id, qty: item.qty })) })
	}, [equipment])

	const handleChange = (e) => {
		const id = e.target.id
		const index = e.target.getAttribute('index')
		const value = Number(e.target.value)
		const qty = isNaN(value) ? equipment[index].qty : value
		setEquipment(update(equipment, {
			[index]: {
				qty: { $set: qty },
				totalValue: { $set: calcItemTotalValue(props.items[id], qty) },
				totalWeight: { $set: calcItemTotalWeight(props.items[id], qty) }
			}
		}))
	}

	const handleEquip = (e) => {
		const id = e.target.id
		const category = e.target.name
		const alreadyEquipped = _.includes(equipped[category], id)
		if (category === 'weapons') {
			const weapons = alreadyEquipped ? _.without(equipped.weapons, id) : [...equipped.weapons, id]
			setEquipped(update(equipped, {
				weapons: { $set: weapons }
			}))
		} else {
			setEquipped(update(equipped, {
				[category]: { $set: alreadyEquipped ? null : id }
			}))
		}
	}

	return (
		<div className="container container--body">			
			<div className="section">
				<div className="grid--money">
					{denominations.map((denomination, i) => (
						<div className="grid--money__cell" key={`denomination${i}`}>
							<input
								type="number"
								id={denomination}
								data-testid={denomination}
								value={money[denomination]}
								onChange={(e) => setMoney({ ...money, [denomination]: Number(e.target.value) })}
							/>  
							<div>{denomination}</div>
						</div>
					))}
				</div>

				<div className="row--right">
					<h4 data-testid="totalMoney">Total money: {totalMoney} gp</h4> 
				</div>
			</div>
			
			<div className="grid--items">
				<h5 className="grid__col1">Item</h5>
				<h5>Qty</h5>
				<h5>Value</h5>
				<h5>Weight</h5>  

				{equipment.map((item, i) => (
					<Fragment key={i}>
						<button 
							className="grid__col1 button--link" 
							id={item.id}
							onClick={() => setSelected({ id: item.id, ...props.items[item.id] })}
						>
							{props.items[item.id].name}
						</button>                                
						<input 
							className="grid__col2" 
							type="number"
							id={item.id}
							data-testid={item.id}
							index={i}
							value={item.qty}
							onChange={(e) => handleChange(e)}
						/>                                
						<div className="grid__col3" data-testid={`${item.id}TotalValue`}>{item.totalValue} gp</div>
						<div className="grid__col4" data-testid={`${item.id}TotalWeight`}>{item.totalWeight} lbs</div> 
					</Fragment>
				))}

				<div className="grid__col1 grid--items__totals">Totals</div>
				<div className="grid__col3 grid--items__totals">{equipmentTotalValue} gp</div>
				<div className="grid__col4 grid--items__totals">{equipmentTotalWeight} lbs</div>

			</div>

			{/* <button>Add New Item</button> */}

			<ItemModal 
				selected={selected} 
				equipped={equipped}
				handleEquip={handleEquip}
				handleCloseModal={() => setSelected(undefined)}
			/>

		</div>
	)
}

const mapStateToProps = ({ profile, items }) => ({
	id: profile.id,
	money: profile.money,
	equipment: profile.equipment,
	equipped: profile.equipped,
	items
})
  
const mapDispatchToProps = (dispatch) => ({
	startEditProfile: (id, updates) => dispatch(startEditProfile(id, updates))
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(EquipmentPage)