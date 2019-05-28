import React from 'react';
import Modal from 'react-modal';
import {convertTextToArray} from '../utils/utils';

if (process.env.NODE_ENV !== 'test') { Modal.setAppElement('#app') }

const SkillModal = ({selected, handleCloseModal}) => (
    <Modal
        isOpen={!!selected}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Skill"
        className="modal"
    >
        {selected && 
            <div>
                <h4>{selected.name}</h4>
                <h5>{selected.keyAbility}</h5>
                {convertTextToArray(selected.description).map((paragraph, i) => 
                    <p key={i}>{paragraph}</p>
                )}
                {selected.notes && <p>Notes: {selected.notes}</p>}
            </div>
        }
    </Modal>

)

export default SkillModal;