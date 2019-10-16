import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import _ from 'lodash'

import CreatorFormEquipment from './CreatorFormEquipment'
import { apiData } from '../../../tests/utils'
import profile from '../../../tests/fixtures/profile'


const setFieldValue = jest.fn()
let api, props

beforeAll(async () => {
   api = await apiData()
   props = {
      items: api.items,
      values: { 
         race: profile.race,
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