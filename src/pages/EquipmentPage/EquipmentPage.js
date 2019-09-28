import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import _ from 'lodash'

import CounterInput from '../../components/CounterInput/CounterInput'
import ItemModal from '../../components/ItemModal'
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal'
import { startEditProfile } from '../../store/actions/profile'
import { 
	calcTotalMoney, calcItemTotalValue, calcItemTotalWeight, 
	calcEquipmentTotalValue, calcEquipmentTotalWeight 
} from '../../utils/utils'
import './EquipmentPage.scss'


const denominations = ['pp', 'gp', 'sp', 'cp']

export const EquipmentPage = (props) => {
	const [money, setMoney] = useState(props.money)
	const [totalMoney, setTotalMoney] = useState(calcTotalMoney(money))
	useEffect(() => {
		setTotalMoney(calcTotalMoney(money))
		props.startEditProfile(props.id, { money })
	}, [money])
	
	const [equipment, setEquipment] = useState(_.sortBy(props.equipment.map((item) => ({
		...item,
		name: props.items[item.id].name,
		totalValue: calcItemTotalValue(props.items[item.id], item.qty),
		totalWeight: calcItemTotalWeight(props.items[item.id], item.qty)
	})), ['name']) || [])
	const [equipmentTotalValue, setEquipmentTotalValue] = useState(calcEquipmentTotalValue(equipment, props.items) || 0)
	const [equipmentTotalWeight, setEquipmentTotalWeight] = useState(calcEquipmentTotalWeight(equipment, props.items) || 0)

	const [equipped, setEquipped] = useState({
		weapons: props.equipped.weapons || [],
		armor: props.equipped.armor || null,
		shield: props.equipped.shield || null
	})
	
	const [newItemId, setNewItemId] = useState(0)

	const [availableItems, setAvailableItems] = useState(
		_.filter(props.items, (item, key) => !_.some(equipment, eq => eq.id === key))
	)

	useEffect(() => {
		setAvailableItems(
			_.filter(props.items, (item, key) => !_.some(equipment, eq => eq.id === key))			
		)
		setEquipmentTotalValue(calcEquipmentTotalValue(equipment, props.items))
		setEquipmentTotalWeight(calcEquipmentTotalWeight(equipment, props.items))
		props.startEditProfile(props.id, { equipment: _.map(equipment, (item) => ({ id: item.id, qty: item.qty })) })
	}, [equipment])

	const [selected, setSelected] = useState(undefined)

	const handleQtyChange = (itemId, index, value) => {
		const qty = value < 1 ? 1 : value
		setEquipment(update(equipment, {
			[index]: {
				qty: { $set: qty },
				totalValue: { $set: calcItemTotalValue(props.items[itemId], qty) },
				totalWeight: { $set: calcItemTotalWeight(props.items[itemId], qty) }
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

	const handleAddEquipment = () => {
		setEquipment(_.sortBy([...equipment, {
			id: newItemId,
			name: props.items[newItemId].name,
			qty: 1,
			totalValue: calcItemTotalValue(props.items[newItemId], 1),
			totalWeight: calcItemTotalWeight(props.items[newItemId], 1)
		}], ['name']))
	}

	const [equipmentToRemove, setEquipmentToRemove] = useState(null)
	const handleRemoveEquipment = itemId => {
		setEquipment(_.filter(equipment, item => item.id !== itemId))
	}

	return (
		<div className="equipment-container">
			<div className="money-container">
				<div className="money-row">
					{denominations.map((denomination, i) => (
						<div className="money-group" key={`denomination${i}`}>
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

			<div className="items-container">
				<div className="item-row--header">
					<h5>Item</h5>
					<div></div>
					<h5 style={{ textAlign: 'center' }}>Qty</h5>
					<h5>Val (gp)</h5>
					<h5>Wgt (lbs)</h5>
				</div>
				<div className="items-list">
					{_.map(_.sortBy(equipment, ['name']), (item, i) => (
						<div key={i} className="item-row">
							<button 
								className="button--link" 
								id={item.id}
								onClick={() => setSelected({ id: item.id, ...props.items[item.id] })}
							>
								{props.items[item.id].name}
							</button>

							<div>
								<button
									className="remove-button"
									onClick={() => setEquipmentToRemove(item)}
								>
									<ion-icon name="trash" size="small" />
								</button>
							</div>

							<CounterInput
								value={Number(item.qty)}
								updateValue={value => handleQtyChange(item.id, i, value)}
							/>

							<div data-testid={`${item.id}TotalValue`}>{item.totalValue}</div>
							<div data-testid={`${item.id}TotalWeight`}>{item.totalWeight}</div> 
						</div>
					))}
				</div>
				<div className="item-row--footer">
					<h5>Totals</h5>
					<h5></h5>
					<h5>{equipmentTotalValue} gp</h5>
					<h5>{equipmentTotalWeight} lbs</h5>
				</div>
			</div>

			<div className="add-item-container">
				<select
					className="select"
					value={newItemId}
					onChange={(e) => setNewItemId(e.target.value)}
				>
					<option value={0}>
						Add a new item
					</option>
					{_.map(_.sortBy(availableItems, ['name']), (item, i) => {
						const itemId = _.findKey(props.items, item) 
						return (
							<option
								value={itemId}
								key={itemId}
							>
								{props.items[itemId].name}
							</option>
						)
					})}
				</select>

				<button
					className="button"
					type="button"
					onClick={() => handleAddEquipment()}
				>
					Add Item
				</button>
			</div>
			

			<ItemModal 
				selected={selected} 
				equipped={equipped}
				handleEquip={handleEquip}
				handleCloseModal={() => setSelected(undefined)}
			/>

			<ConfirmationModal
				isOpen={!!equipmentToRemove}
				message={`Remove ${equipmentToRemove && equipmentToRemove.name} from equipment?`}
				handleConfirm={() => handleRemoveEquipment(equipmentToRemove.id)}
				handleCloseModal={() => setEquipmentToRemove(null)}
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