import React from 'react'

import DefaultModal from './DefaultModal'


const ConfirmationModal = ({ 
   clickedItem, 
   messageTitle, 
   message, 
   handleConfirm, 
   handleCloseModal 
}) => (
   <DefaultModal
      clickedItem={clickedItem}
      onRequestClose={handleCloseModal}
      contentLabel="Confirm Decision"
   >
      <h3 className="modal-header">{messageTitle}</h3>
      <p className="modal-body">{message}</p>
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