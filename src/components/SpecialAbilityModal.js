import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const SpecialAbilityModal = ({selected, handleCloseModal}) => (
    <Modal
        isOpen={!!selected}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Special Ability"
    >
        {selected && 
            <div>
                <h4>{selected.name}</h4>
                <h5>{selected.type}</h5>
                <p>{selected.description}</p>
            </div>
        }
    </Modal>

)

export default SpecialAbilityModal;