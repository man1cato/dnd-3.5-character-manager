import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import EquipButton from './EquipButton'
import { apiData } from '../../tests/utils/utils'

let items, item, wrapper

beforeAll(async () => {
   const api = await apiData()
   items = api.items   
   item = _.find(items, (item) => item.category === 'Weapon')
   wrapper = shallow(<EquipButton item={item} />)
})


test('should display equip button if category is armor, shield, or weapon', () => {
   expect(wrapper.find('button')).toHaveLength(1)

   item = _.find(items, (item) => item.category === 'Shield')
   wrapper = shallow(<EquipButton item={item} />)
   expect(wrapper.find('button')).toHaveLength(1)

   item = _.find(items, (item) => item.category === 'Misc')
   wrapper = shallow(<EquipButton item={item} />)
   expect(wrapper.find('button')).toHaveLength(0)

   item = _.find(items, (item) => item.category === 'Armor')
   wrapper = shallow(<EquipButton item={item} />)
   expect(wrapper.find('button')).toHaveLength(1)
})

test('should display unequip button if item is equipped', () => {
   const equipped = { armor: item.id }
   wrapper = shallow(<EquipButton item={item} equipped={equipped}/>)
    expect(wrapper.find('button').text()).toEqual('Unequip')
})