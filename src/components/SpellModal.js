import React from 'react';
import Modal from 'react-modal';
import {convertTextToArray} from '../utils/utils';

if (process.env.NODE_ENV !== 'test') { Modal.setAppElement('#app') }

const SpellModal = ({selected, handleCloseModal}) => (
    <Modal
        isOpen={!!selected}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Spell"
        className="modal"
    >
        {selected && 
            <div>
                <h4>{selected.name}</h4>
                <h5>{selected.school}</h5>
                {convertTextToArray(selected.description).map((paragraph, i) => 
                    <p key={i}>{paragraph}</p>
                )}
                <p>Components: {selected.components}</p>
                <p>Casting Time: {selected.castingTime}</p>
                <p>Range: {selected.range}</p>
                <p>Duration: {selected.duration}</p>
                <p>Target / Effect / Area: {selected.effectArea}</p>
                <p>Saving Throw: {selected.savingThrow}</p>
                <p>Spell Resistance: {selected.spellResistance}</p>
            </div>
        }
    </Modal>

)

export default SpellModal;