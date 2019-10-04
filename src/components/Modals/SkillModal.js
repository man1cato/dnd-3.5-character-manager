import React from 'react'

import DefaultModal from './DefaultModal'
import { convertTextToArray } from '../../utils/utils'


const SkillModal = ({clickedSkill, handleCloseModal}) => (
    <DefaultModal
        clickedItem={clickedSkill}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Skill"
    >
        {clickedSkill && 
            <>
                <h4>{clickedSkill.name}</h4>
                <h5>{clickedSkill.keyAbility}</h5>
                {convertTextToArray(clickedSkill.description).map((paragraph, i) => 
                    <p key={i}>{paragraph}</p>
                )}
                {clickedSkill.notes && <p>Notes: {clickedSkill.notes}</p>}
            </>
        }
    </DefaultModal>
)

export default SkillModal