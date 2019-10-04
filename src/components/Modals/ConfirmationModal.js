import React from 'react'

import DefaultModal from './DefaultModal'


const ConfirmationModal = ({ clickedItem, message, handleConfirm, handleCloseModal }) => (
   <DefaultModal
      clickedItem={clickedItem}
      onRequestClose={handleCloseModal}
      contentLabel="Confirm Decision"
   >
      <h3 className="modal-header">{message}</h3>
      <div className="button-container">
         <button
            className="button--primary"
            onClick={() => {
               handleConfirm()
               handleCloseModal()
            }}
         >
            Confirm
         </button>

         <button
            className="button--secondary"
            onClick={() => handleCloseModal()}
         >
            Cancel
         </button>
      </div>
   </DefaultModal>
)

export default ConfirmationModal