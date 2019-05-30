import React from 'react'
import Modal from 'react-modal'
import {convertTextToArray} from '../utils/utils'

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
                <p><b>Components:</b> {selected.components}</p>
                <p><b>Casting Time:</b> {selected.castingTime}</p>
                <p><b>Range:</b> {selected.range}</p>
                <p><b>Duration:</b> {selected.duration}</p>
                <p><b>Target / Effect / Area:</b> {selected.effectArea}</p>
                <p><b>Saving Throw:</b> {selected.savingThrow}</p>
                <p><b>Spell Resistance:</b> {selected.spellResistance}</p>
            </div>
        }
    </Modal>

)

export default SpellModal