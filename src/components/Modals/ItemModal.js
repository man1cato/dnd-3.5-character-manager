import React from 'react'
import _ from 'lodash'

import DefaultModal from './DefaultModal'
import EquipButton from '../EquipButton/EquipButton'


const ItemModal = ({ clickedItem, equipped, handleEquip, handleCloseModal }) => (
	<DefaultModal
		clickedItem={clickedItem}
		onRequestClose={handleCloseModal}
		contentLabel="Selected Item"
	>
		{clickedItem && 
			<>
				<h4>{clickedItem.name}</h4>
				<h5>{clickedItem.category}</h5>

				{clickedItem.weaponType && (
					<>
						<p>Type: {clickedItem.weaponType} / {clickedItem.encumbrance} / {clickedItem.damageType}</p>
						<p>Range: {clickedItem.range}</p>
						<p>Damage (M): {clickedItem.damageM}</p>
						<p>Damage (S): {clickedItem.damageS}</p>
						<p>Critical: {clickedItem.critical}</p>
					</>
				)}

				<p>Value: {clickedItem.value} gp</p>
				<p>Weight: {clickedItem.weight} lbs</p>

				<EquipButton item={clickedItem} equipped={equipped} handleEquip={handleEquip} />

			</>
		}
	</DefaultModal>
)

export default ItemModal