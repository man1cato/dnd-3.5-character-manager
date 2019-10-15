import React from 'react'
import Modal from 'react-modal'
import _ from 'lodash'

import './Modal.scss'

if (process.env.NODE_ENV !== 'test') { Modal.setAppElement('#app') }


const DefaultModal = ({ 
   clickedItem, 
   contentLabel, 
   onRequestClose, 
   children, 
   ...rest 
}) => {
   return (
      <Modal
         className="DefaultModal"
         isOpen={!!clickedItem}
         onRequestClose={onRequestClose}
         contentLabel={contentLabel}
         ariaHideApp={process.env.NODE_ENV === 'test' ? false : true}
         {...rest}
      >
         {children}
      </Modal>
   )
}

export default DefaultModal