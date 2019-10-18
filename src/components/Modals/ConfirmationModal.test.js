import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import _ from 'lodash'

import ConfirmationModal from './ConfirmationModal'
import { apiData } from '../../test-utils/utils'


const handleConfirm = jest.fn()
const handleCloseModal = jest.fn()
let props

beforeAll(async () => {
   const api = await apiData()
   props = {
      clickedItem: _.values(api.items)[0],
      messageTitle: 'Decision',
      message: 'Do the thing?',
      handleConfirm,
      handleCloseModal 
   }
})


test('should render ConfirmationModal', () => {
   const { baseElement } = render(<ConfirmationModal {...props} />)
   expect(baseElement).toMatchSnapshot()
})

test(' should trigger handleConfirm when Confirm button clicked', () => {
   const { getByText } = render(<ConfirmationModal {...props} />)
   fireEvent.click(getByText('Confirm'))
   expect(handleConfirm).toHaveBeenCalled()
})

test(' should trigger handleCloseModal when Cancel button clicked', () => {
   const { getByText } = render(<ConfirmationModal {...props} />)
   fireEvent.click(getByText('Cancel'))
   expect(handleCloseModal).toHaveBeenCalled()
})