import React from 'react'

import DefaultModal from './DefaultModal'
import { convertTextToArray } from '../../utils/utils'


const SpecialAbilityModal = ({ clickedAbility, handleCloseModal }) => (
    <DefaultModal
        clickedItem={clickedAbility}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Special Ability"
    >
        {clickedAbility && 
            <>
                <h4>{clickedAbility.name}</h4>
                <h5>{clickedAbility.type}</h5>
                {convertTextToArray(clickedAbility.description).map((paragraph, i) => 
                    <p key={i}>{paragraph}</p>
                )}   
            </>
        }
    </DefaultModal>
)

export default SpecialAbilityModal