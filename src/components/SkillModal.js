import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const SkillModal = ({selectedSkill, handleCloseModal}) => (
    <Modal
        isOpen={!!selectedSkill}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Skill"
    >
        {selectedSkill && 
            <div>
                <h4>{selectedSkill.name}</h4>
                <h5>{selectedSkill.keyAbility}</h5>
                <p>{selectedSkill.description}</p>
                {selectedSkill.notes && <p>Notes: {selectedSkill.notes}</p>}
            </div>
        }
    </Modal>

)

export default SkillModal;