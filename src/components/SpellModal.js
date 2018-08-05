import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const SpellModal = ({selectedSpell, handleCloseModal}) => (
    <Modal
        isOpen={!!selectedSpell}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Spell"
    >
        {selectedSpell && 
            <div>
                <h4>{selectedSpell.name}</h4>
                <h5>{selectedSpell.school}</h5>
                <p>{selectedSpell.description}</p>
                <p>Components: {selectedSpell.components}</p>
                <p>Casting Time: {selectedSpell.castingTime}</p>
                <p>Range: {selectedSpell.range}</p>
                <p>Duration: {selectedSpell.duration}</p>
                <p>Target / Effect / Area: {selectedSpell.effectArea}</p>
                <p>Saving Throw: {selectedSpell.savingThrow}</p>
                <p>Spell Resistance: {selectedSpell.spellResistance}</p>
            </div>
        }
    </Modal>

)

export default SpellModal;