import React from 'react'
import { render } from '@testing-library/react'
import _ from 'lodash'

import ItemModal from './ItemModal'
import { apiData } from '../../test-utils/utils'


const handleEquip = jest.fn()
const handleCloseModal = jest.fn()
let props

beforeAll(async () => {
   const api = await apiData()
   props = {
      characterSize: 'Medium', 
      clickedItem: api.items[0],
      equipped: {
         armor: null,
         shield: null,
         weapons: []
      }, 
      handleEquip, 
      handleCloseModal
   }
})


test('should render ItemModal', () => {
   const { baseElement } = render(<ItemModal {...props}/>)
   expect(baseElement).toMatchSnapshot()
})