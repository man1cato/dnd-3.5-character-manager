import React from 'react'
import _ from 'lodash'


const EquipButton = ({ item, equipped, handleEquip }) => (
   <>
      {_.includes(['Weapon', 'Armor', 'Shield'], item.category) ? (
         <button
            className="button--secondary"
            id={item.id}
            name={item.category === 'Weapon' ? 'weapons' : item.category.toLowerCase()}
            type="button"
            onClick={(e) => handleEquip(e)}
         >
            {_.includes(_.flatMapDeep(equipped), item.id) ? 'Unequip' : 'Equip' }
         </button>
      ) : (
         <div></div>
      )}
   </>
)

export default EquipButton