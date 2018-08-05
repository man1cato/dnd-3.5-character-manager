import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const FeatModal = ({selectedFeat, handleCloseModal}) => (
    <Modal
        isOpen={!!selectedFeat}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Spell"
    >
        {selectedFeat && 
            <div>
                <h4>{selectedFeat.name}</h4>
                <h5>{selectedFeat.type}</h5>
                <p>{selectedFeat.description}</p>
            </div>
        }
    </Modal>

)

export default FeatModal;