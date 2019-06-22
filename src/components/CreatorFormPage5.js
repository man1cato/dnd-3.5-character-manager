import React, { useState, useEffect, Fragment } from 'react'
import _ from 'lodash'
import update from 'immutability-helper'
import { ErrorMessage } from 'formik'

import ItemModal from './ItemModal'
import Selector from './Selector'
import EquipButton from './EquipButton'


const CreatorFormPage5 = ({
	values, 
	items, 
	setFieldValue, 
	validateForm
}) => {
	const [selectedItemIds, setSelectedItemIds] = useState([])
	const [equipped, setEquipped] = useState({ weapons: [],	armor: null, shield: null	})
	const [selected, setSelected] = useState(undefined)

	useEffect(() => {
		if (selectedItemIds.length > values.equipment.length) {
			setFieldValue('equipment', [...values.equipment, { id: _.last(selectedItemIds), qty: 1 }])
		} else {
			const idToRemove = _.difference(_.map(values.equipment, (item) => item.id), selectedItemIds)[0]
			setFieldValue('equipment', _.filter(values.equipment, (item) => item.id !== idToRemove))
		}
	}, [selectedItemIds])

	useEffect(() => {
		setFieldValue('equipped', equipped)
	}, [equipped])

	const handleEquip = (e) => {
		const id = e.target.id
		const category = e.target.name
		const alreadyEquipped = _.includes(equipped[category], id) 
		if(category === 'weapons') {
			const weapons = alreadyEquipped ? _.without(equipped.weapons, id) : [...equipped.weapons, id]
			return setEquipped(update(equipped, {
				weapons: { $set: weapons }
			}))
		} 
		return setEquipped(update(equipped, {
			[category]: { $set: alreadyEquipped ? null : id }
		}))			
	}

	const handleChange = (e) => {
		const id = e.target.id
		const value = e.target.value
		const index = _.findIndex(values.equipment, {id})
		setFieldValue(`equipment[${index}]`, { id, qty: value })
	}

	useEffect(() => {
		validateForm()
	}, [])

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
		<div>
			<h3 className="row--center">Select Equipment</h3>

			<Selector
				apiObject={items} 
				fieldName="equipment"
				Content={Content}
				selectedObjIds={selectedItemIds}
				setSelectedObjIds={setSelectedItemIds}
			/>

			<div className="divider"></div>

			<h4 className="row--left">Selected Equipment:</h4>
			<div className="form-grid--equipment">
				<h5 className="grid__col1">Item</h5>
				<h5>Qty</h5>
				<div></div>
				<div></div>

				{_.map(values.equipment, (item) => {
					const id = item.id
					item = { id, ...items[id] }
					return (
						<Fragment key={id}>
							<button
								className="button--link grid__col1"
								type="button"
								id={id}
								onClick={() => setSelected(item)}
							>
								{items[id].name}
							</button>

							<input 
								className="grid__col2 text-input"
								id={id}
								value={_.find(values.equipment, { id }).qty} 
								onChange={(e) => handleChange(e)} 
							/>
							
							<EquipButton
								className="grid__col3"
								item={item} 
								equipped={values.equipped} 
								handleEquip={handleEquip} 
							/>
							
							<button 
								className="grid__col4 button"
								type="button" 
								onClick={() => setSelectedItemIds(_.without(selectedItemIds, id))}
							>
								x
							</button>
						</Fragment>
					)
				})}
			</div>

			<ItemModal
				selected={selected}
				equipped={values.equipped}
				handleCloseModal={() => setSelected(undefined)}
				handleEquip={handleEquip}
			/>

			<ErrorMessage className="row--left form-group--error" name="equipment" component="div" />
		</div>
	)
}

export default CreatorFormPage5