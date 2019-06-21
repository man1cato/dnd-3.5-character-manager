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
		<>
			<h5>{selected.category}</h5>

			{selected.weaponType && (
				<div>
					<p>Type: {selected.weaponType} / {selected.encumbrance} / {selected.damageType}</p>
					<p>Range: {selected.range}</p>
					<p>Damage (M): {selected.damageM}</p>
					<p>Damage (S): {selected.damageS}</p>
					<p>Critical: {selected.critical}</p>
				</div>
			)}

			<p>Value: {selected.value} gp</p>
			<p>Weight: {selected.weight} lbs</p>
		</>
	)
	
	return (
		<div>
			<h3 className="row--center">Equipment</h3>

			<Selector
				apiObject={items} 
				fieldName="equipment"
				Content={Content}
				selectedObjIds={selectedItemIds}
				setSelectedObjIds={setSelectedItemIds}
			/>

			<h4 className="row--left">Selected Equipment:</h4>
			<div className="grid grid--items">
				{_.map(values.equipment, (item) => {
					const id = item.id
					item = { id, ...items[id] }
					return (
						<Fragment key={id}>
							<button
								className="button--link grid__col1"
								type="button"
								id={id}
								onClick={() => setSelected(items[id])}
							>
								{items[id].name}
							</button>

							<input 
								className="grid__col2"
								id={id}
								value={_.find(values.equipment, { id }).qty} 
								onChange={(e) => handleChange(e)} 
							/>
							
							<div className="grid__col3">
								<EquipButton 								
									item={item} 
									equipped={values.equipped} 
									handleEquip={handleEquip} 
								/>
							</div>
							
							<button 
								className="grid__col4"
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
				handleCloseModal={() => setSelected(undefined)}
				handleEquip={handleEquip}
			/>

			<ErrorMessage className="row--left" name="equipment" component="div" />
		</div>
	)
}

export default CreatorFormPage5