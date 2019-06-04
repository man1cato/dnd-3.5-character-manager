import React from 'react'
import Modal from 'react-modal'

if (process.env.NODE_ENV !== 'test') { Modal.setAppElement('#app') }

const ItemModal = ({selected, handleCloseModal}) => (
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
                ) }
                <p>Value: {selected.value} gp</p>
                <p>Weight: {selected.weight} lbs</p>
            </div>
        }
    </Modal>

)

export default ItemModal