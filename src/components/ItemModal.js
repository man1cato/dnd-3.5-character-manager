import React from 'react'
import Modal from 'react-modal'
import _ from 'lodash'

if (process.env.NODE_ENV !== 'test') { Modal.setAppElement('#app') }

const ItemModal = ({selected, equipped, handleEquip, handleCloseModal }) => (
    <Modal
        isOpen={!!selected}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Item"
        className="modal"
    >
        {selected && 
            <div>
                <h4>{selected.name}</h4>
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

                {_.includes(['Weapon', 'Armor', 'Shield'], selected.category) && (
                    <button
                        id={selected.id}
                        name={selected.category === 'Weapon' ? 'weapons' : selected.category.toLowerCase()}
                        onClick={(e) => handleEquip(e)}
                    >
                        {_.includes(_.flatMapDeep(equipped), selected.id) ? 'Unequip' : 'Equip' }
                    </button>
                )}

            </div>
        }
    </Modal>
)

export default ItemModal