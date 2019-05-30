import React from 'react'
import Modal from 'react-modal'

if (process.env.NODE_ENV !== 'test') { Modal.setAppElement('#app') }

const FeatModal = ({selected, handleCloseModal}) => (
    <Modal
        isOpen={!!selected}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Feat"
        className="modal"
    >
        {selected && 
            <div>
                <h4>{selected.name}</h4>
                <h5>{selected.types.join(", ")}</h5>
                <p>{selected.description}</p>
            </div>
        }
    </Modal>

)

export default FeatModal