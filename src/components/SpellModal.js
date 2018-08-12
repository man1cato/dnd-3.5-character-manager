import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const SpellModal = ({selected, handleCloseModal}) => (
    <Modal
        isOpen={!!selected}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Spell"
    >
        {selected && 
            <div>
                <h4>{selected.name}</h4>
                <h5>{selected.school}</h5>
                <p>{selected.description}</p>
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