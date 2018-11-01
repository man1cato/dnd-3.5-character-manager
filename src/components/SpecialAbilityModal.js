import React from 'react';
import Modal from 'react-modal';
import {convertTextToArray} from '../utils/utils';

Modal.setAppElement('#app');

const SpecialAbilityModal = ({selected, handleCloseModal}) => (
    <Modal
        isOpen={!!selected}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Special Ability"
        className="modal"
    >
        {selected && 
            <div>
                <h4>{selected.name}</h4>
                <h5>{selected.type}</h5>
                {convertTextToArray(selected.description).map((paragraph, i) => 
                    <p key={i}>{paragraph}</p>
                )}   
            </div>
        }
    </Modal>

)

export default SpecialAbilityModal;