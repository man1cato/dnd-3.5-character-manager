import React from 'react'
import _ from 'lodash'


const EquipButton = ({ item, equipped, handleEquip }) => (
   <>
      {_.includes(['Weapon', 'Armor', 'Shield'], item.category) ? (
         <button
            className="button"
            id={item.id}
            name={item.category === 'Weapon' ? 'weapons' : _.lowerCase(item.category)}
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