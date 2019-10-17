import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import _ from 'lodash'

import EquipButton from './EquipButton'
import { apiData } from '../../tests/utils'
import { apiObjectToArray } from '../../utils/utils'


const handleEquip = jest.fn()
let props, items, item

beforeAll(async () => {
   const api = await apiData() 
   items = apiObjectToArray(api.items)
   item = _.find(items, item => item.category === 'Weapon'),
   props = {
      item,
      equipped: {
         armor: null,
         shield: null,
         weapons: []
      },
      handleEquip
   } 
})


test('should display equip button if category is armor, shield, or weapon', () => {
   const { getByText } = render(<EquipButton {...props} />)
   expect(getByText('Equip')).toBeDefined()
})

test('should display empty div if category is not armor, shield, or weapon', () => {
   const { queryByRole } = render(<EquipButton {...props} item={_.find(items, item => item.category === 'Clothing')}/>)
   expect(queryByRole('button')).toBeNull()
})

test('should display unequip button if item is equipped', () => {
   const { getByText } = render(<EquipButton {...props} equipped={{ weapons: [item.id] }} />)
   expect(getByText('Unequip')).toBeDefined()
})