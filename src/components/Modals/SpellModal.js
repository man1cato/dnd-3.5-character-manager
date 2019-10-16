import React from 'react'

import DefaultModal from './DefaultModal'
import { convertTextToArray } from '../../utils/utils'


const SpellModal = ({ clickedSpell, handleCloseModal }) => (
    <DefaultModal
        clickedItem={clickedSpell}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Spell"
    >
        {clickedSpell && 
            <>
                <h3>{clickedSpell.name}</h3>
                <h5>{clickedSpell.school}</h5>
                {convertTextToArray(clickedSpell.description).map((paragraph, i) => 
                    <p key={i}>{paragraph}</p>
                )}
                <p><b>Components:</b> {clickedSpell.components}</p>
                <p><b>Casting Time:</b> {clickedSpell.castingTime}</p>
                <p><b>Range:</b> {clickedSpell.range}</p>
                <p><b>Duration:</b> {clickedSpell.duration}</p>
                <p><b>Target / Effect / Area:</b> {clickedSpell.effectArea}</p>
                <p><b>Saving Throw:</b> {clickedSpell.savingThrow}</p>
                <p><b>Spell Resistance:</b> {clickedSpell.spellResistance}</p>
            </>
        }
    </DefaultModal>
)

export default SpellModal