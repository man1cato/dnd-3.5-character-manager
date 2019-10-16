import React from 'react'
import _ from 'lodash'

import DefaultModal from './DefaultModal'
import EquipButton from '../EquipButton/EquipButton'


const ItemModal = ({ characterSize, clickedItem, equipped, handleEquip, handleCloseModal }) => (
	<DefaultModal
		clickedItem={clickedItem}
		onRequestClose={handleCloseModal}
		contentLabel="Selected Item"
	>
		{clickedItem && 
			<>
				<h3>{clickedItem.name}</h3>
				<h5>{clickedItem.category}</h5>
				<p>{clickedItem.notes}</p>

				{clickedItem.weaponType && (
					<>
						<p><b>Type:</b> {clickedItem.weaponType} / {clickedItem.encumbrance} / {clickedItem.damageType}</p>
						<p><b>Range:</b> {clickedItem.range}</p>
						<p><b>Damage:</b> {clickedItem.damage[_.lowerCase(characterSize)]}</p>
						<p><b>Critical:</b> {clickedItem.critical}</p>
					</>
				)}

				<p><b>Value:</b> {clickedItem.value} gp</p>
				<p><b>Weight:</b> {clickedItem.weight} lbs</p>

				<EquipButton item={clickedItem} equipped={equipped} handleEquip={handleEquip} />

			</>
		}
	</DefaultModal>
)

export default ItemModal