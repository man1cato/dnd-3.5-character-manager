import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import { ErrorMessage } from 'formik'

import ItemModal from './ItemModal'
import Selector from './Selector'
import EquipButton from './EquipButton'
import { calcItemTotalValue, calcEquipmentTotalValue, calcEquipmentTotalWeight } from '../utils/utils'


const CreatorFormEquipment = ({
	values, 
	items, 
	setFieldValue
}) => {
	const { equipped } = values
	const [equipment, setEquipment] = useState(values.equipment)
	const [selectedItemIds, setSelectedItemIds] = useState([])
	const [selected, setSelected] = useState(undefined)
	const [totalCost, setTotalCost] = useState(0)
	const [totalWeight, setTotalWeight] = useState(0)

	const updateEquipment = (equipment) => {
		setFieldValue('equipment', equipment)
		setEquipment(equipment)
	}

	useEffect(() => {
		if (selectedItemIds.length > equipment.length) {
			updateEquipment([...equipment, { id: _.last(selectedItemIds), qty: 1 }])
		} else {
			const idToRemove = _.difference(_.map(equipment, (item) => item.id), selectedItemIds)[0]
			updateEquipment(_.filter(equipment, (item) => item.id !== idToRemove))
			setFieldValue('equipped', {
				armor: equipped.armor === idToRemove ? null : equipped.armor,
				shield: equipped.shield === idToRemove ? null : equipped.shield,
				weapons: _.filter(equipped.weapons, (id) => id !== idToRemove)
			})
		}
	}, [selectedItemIds])
	
	useEffect(() => {
		setTotalCost(calcEquipmentTotalValue(equipment, items))
		setTotalWeight(calcEquipmentTotalWeight(equipment, items))
	}, [equipment])

	useEffect(() => {
		setFieldValue('remainingGold', values.startingGold - totalCost)
	}, [totalCost])

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

	const Content = ({selected}) => (
		<div>
			<div className="form-group--35"><b>Category:</b> <div>{selected.category}</div></div>

			{selected.weaponType && (
				<>
					<div className="form-group--35"><b>Type:</b> <div>{selected.weaponType} / {selected.encumbrance} / {selected.damageType}</div></div>
					<div className="form-group--35"><b>Range:</b> <div>{selected.range}</div></div>
					<div className="form-group--35"><b>Damage (M):</b> <div>{selected.damageM}</div></div>
					<div className="form-group--35"><b>Damage (S):</b> <div>{selected.damageS}</div></div>
					<div className="form-group--35"><b>Critical:</b> <div>{selected.critical}</div></div>
				</>
			)}

			<div className="form-group--35"><b>Value:</b> <div>{selected.value} gp</div></div>
			<div className="form-group--35"><b>Weight:</b> <div>{selected.weight} lbs</div></div>
		</div>
	)
	
	return (
		<>
			<h3 className="row--center">Purchase Equipment</h3>

			<Selector
				apiObject={items} 
				fieldName="equipment"
				Content={Content}
				selectedObjIds={selectedItemIds}
				setSelectedObjIds={setSelectedItemIds}
			/>

			<div className="divider"></div>

			<h4>Selected Equipment:</h4>

			<div className="section form-grid--equipment">
				<h5 className="grid__col1">Item</h5>
				<h5 className="grid__col2">Qty</h5>
				<h5 className="grid__col3">Cost (gp)</h5>

				{_.map(equipment, (item) => {
					const id = item.id
					item = { id, ...items[id] }
					const qty = _.find(equipment, { id }).qty
					return (
						<Fragment key={`${id}Equipment`}>
							<button
								className="grid__col1 button--link"
								type="button"
								id={id}
								onClick={() => setSelected(item)}
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
								x
							</button>
						</Fragment>
					)
				})}
			</div>

			<ErrorMessage className="form-group--error" name="equipment" component="div" />
			<ErrorMessage className="form-group--error" name="remainingGold" component="div" />
			
			<div className="form-group">
				<div>Total weight: {totalWeight} lbs</div>
				<div>Remaining gold: {values.remainingGold} gp</div>
			</div>

			<ItemModal
				selected={selected}
				equipped={equipped}
				handleCloseModal={() => setSelected(undefined)}
				handleEquip={handleEquip}
			/>

		</>
	)
}

export default CreatorFormEquipment