import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import _ from 'lodash'

import { apiData } from '../../../tests/utils'
import CreatorFormEquipment from './CreatorFormEquipment'


const setFieldValue = jest.fn()
let api, props

beforeAll(async () => {
   api = await apiData()
   props = {
      items: api.items,
      values: { 
         equipment: [],
         equipped: {
            armor: null,
            shield: null,
            weapons: []
         }
      },
      setFieldValue
   }
})


test('should correctly render CreatorFormEquipment', () => {
   const { container } = render(<CreatorFormEquipment {...props} />)
   expect(container.firstChild).toMatchSnapshot()
})