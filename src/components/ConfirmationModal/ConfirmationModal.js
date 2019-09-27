import React from 'react'
import Modal from 'react-modal'

import './ConfirmationModal.scss'


if (process.env.NODE_ENV !== 'test') { Modal.setAppElement('#app') }

const ConfirmationModal = ({ isOpen, message, handleConfirm, handleCloseModal }) => (
   <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Confirm Decision"
      className="modal"
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
   </Modal>
)

export default ConfirmationModal;