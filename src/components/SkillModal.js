import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const SkillModal = ({selected, handleCloseModal}) => (
    <Modal
        isOpen={!!selected}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Skill"
    >
        {selected && 
            <div>
                <h4>{selected.name}</h4>
                <h5>{selected.keyAbility}</h5>
                <p>{selected.description}</p>
                {selected.notes && <p>Notes: {selected.notes}</p>}
            </div>
        }
    </Modal>

)

export default SkillModal;