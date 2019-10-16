import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import { ErrorMessage } from 'formik'

import ItemModal from '../../../components/Modals/ItemModal'
import Selector from '../../../components/Selector/Selector'
import EquipButton from '../../../components/EquipButton/EquipButton'
import { apiObjectToArray, calcItemTotalValue, calcEquipmentTotalValue, calcEquipmentTotalWeight } from '../../../utils/utils'
import './CreatorFormEquipment.scss'


const CreatorFormEquipment = ({
	values, 
	items, 
	setFieldValue
}) => {
	const { race, equipped } = values
	const itemsArray = apiObjectToArray(items)

	const [equipment, setEquipment] = useState(values.equipment)
	const [availableItems, setAvailableItems] = useState(itemsArray)
	const [selectedItemIds, setSelectedItemIds] = useState([])
	const [clickedItem, setClickedItem] = useState(undefined)
	const [totalCost, setTotalCost] = useState(0)
	const [totalWeight, setTotalWeight] = useState(0)

	const updateEquipment = equipment => {
		setFieldValue('equipment', equipment)
		setEquipment(equipment)
	}

	useEffect(() => {
		setAvailableItems(_.filter(itemsArray, item =>
			!_.includes(selectedItemIds, item.id)
		))
		if (selectedItemIds.length > equipment.length) {
			updateEquipment([...equipment, { id: _.last(selectedItemIds), qty: 1 }])
		} else {
			const idToRemove = _.difference(_.map(equipment, item => item.id), selectedItemIds)[0]
			updateEquipment(_.filter(equipment, item => item.id !== idToRemove))
			setFieldValue('equipped', {
				armor: equipped.armor === idToRemove ? null : equipped.armor,
				shield: equipped.shield === idToRemove ? null : equipped.shield,
				weapons: _.filter(equipped.weapons, id => id !== idToRemove)
			})
		}
	}, [selectedItemIds])
	
	useEffect(() => {
		setTotalCost(calcEquipmentTotalValue(equipment, items))
		setTotalWeight(calcEquipmentTotalWeight(equipment, items))
	}, [equipment])

	useEffect(() => {
		setFieldValue('remainingGold', (values.startingGold - totalCost).toFixed(2))
	}, [totalCost])

	const handleSelect = selectedItemId => {
		setSelectedItemIds([...selectedItemIds, selectedItemId])
	}

	const handleEquip = (e) => {
		const id = e.target.id
		const category = e.target.name
		const alreadyEquipped = _.includes(equipped[category], id) 
		if(category === 'weapons') {
			const weapons = alreadyEquipped ? _.without(equipped.weapons, id) : [...equipped.weapons, id]
			return setFieldValue('equipped', update(equipped, {
				weapons: { $set: weapons }
			}))
		} 
		return setFieldValue('equipped', update(equipped, {
			[category]: { $set: alreadyEquipped ? null : id }
		}))			
	}

	const SelectorContent = ({ currentItemId }) => {
		const currentItem = items[currentItemId]
		return (
			<div>
				<p><b>Category:</b> {currentItem.category}</p>

				{currentItem.weaponType && (
					<>
						<p><b>Type:</b> {currentItem.weaponType} / {currentItem.encumbrance} / {currentItem.damageType}</p>
						<p><b>Range:</b> {currentItem.range}</p>
						<p><b>Damage:</b> {currentItem.damage[_.lowerCase(race.size)]}</p>
						<p><b>Critical:</b> {currentItem.critical}</p>
					</>
				)}

				<p><b>Value:</b> {currentItem.value} gp</p>
				<p><b>Weight:</b> {currentItem.weight} lbs</p>
			</div>
		)
	}
	
	return (
		<div className="container--body">						
			<h3 className="section__title">Purchase Equipment</h3>

			<Selector
				items={availableItems} 
				Content={SelectorContent}
				handleSelect={handleSelect}
			/>

			<div className="divider"></div>

			<h4>Selected Equipment:</h4>

			<div className="section CreatorFormEquipment__grid">
				<h5 className="grid__col1">Item</h5>
				<h5 className="grid__col2">Qty</h5>
				<h5 className="grid__col3">Cost (gp)</h5>

				{_.map(equipment, item => {
					const id = item.id
					item = { id, ...items[id] }
					const qty = _.find(equipment, { id }).qty
					return (
						<Fragment key={`${id}Equipment`}>
							<button
								className="grid__col1 button--link"
								type="button"
								id={id}
								onClick={() => setClickedItem(item)}
							>
								{items[id].name}
							</button>

							<input 
								className="grid__col2 number-input"
								type="number"
								id={id}
								value={qty} 
								onChange={(e) => {
									const id = e.target.id
									const index = _.findIndex(equipment, { id })
									updateEquipment(update(equipment, {
										[index]: { $set: { id, qty: e.target.value } }
									}))
								}} 
							/>
							<div className="grid__col3">{calcItemTotalValue(item, qty)}</div>
							
							<EquipButton
								className="grid__col4"
								item={item} 
								equipped={equipped} 
								handleEquip={handleEquip} 
							/>
							
							<button 
								className="grid__col5 button"
								type="button" 
								onClick={() => setSelectedItemIds(_.without(selectedItemIds, id))}
							>
								<ion-icon name="close" size="small" />
							</button>
						</Fragment>
					)
				})}
			</div>
			<ErrorMessage className="CreatorForm__error" name="equipment" component="div" />
			
			<div className="CreatorForm__group">
				<div>Total weight: {totalWeight} lbs</div>
				<div>Remaining money: <span style={values.remainingGold < 0 ? { color: "red" } : null}>{values.remainingGold} gp</span></div>
			</div>
			<ErrorMessage className="CreatorForm__error--right" name="remainingGold" component="div" />

			<ItemModal
				characterSize={race.size}
				clickedItem={clickedItem}
				equipped={equipped}
				handleCloseModal={() => setClickedItem(undefined)}
				handleEquip={handleEquip}
			/>

		</div>
	)
}

export default CreatorFormEquipment