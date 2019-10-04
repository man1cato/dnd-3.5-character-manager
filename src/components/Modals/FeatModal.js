import React from 'react'

import DefaultModal from './DefaultModal'


const FeatModal = ({ clickedFeat, handleCloseModal }) => (
    <DefaultModal
        clickedItem={clickedFeat}
        onRequestClose={handleCloseModal}
        contentLabel="Selected Feat"
    >
        {clickedFeat && 
            <>
                <h4>{clickedFeat.name}</h4>
                <h5>{clickedFeat.types.join(", ")}</h5>
                <p>{clickedFeat.description}</p>
            </>
        }
    </DefaultModal>
)

export default FeatModal