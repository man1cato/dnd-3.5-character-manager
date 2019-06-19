import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import ItemModal from '../../components/ItemModal'
import { apiData } from '../utils/utils'


let items, selected, wrapper

beforeAll(async () => {
   const api = await apiData()
   items = api.items   
   selected = _.find(items, (item) => item.category === 'Weapon')
   wrapper = shallow(<ItemModal selected={selected} />)
})


test('should render ItemModal', () => {
   expect(wrapper).toMatchSnapshot()
})

test('should display equip button if category is armor, shield, or weapon', () => {
   expect(wrapper.find('h5').text()).toEqual('Weapon')
   expect(wrapper.find('button')).toHaveLength(1)

   selected = _.find(items, (item) => item.category === 'Shield')
   wrapper = shallow(<ItemModal selected={selected} />)
   expect(wrapper.find('h5').text()).toEqual('Shield')
   expect(wrapper.find('button')).toHaveLength(1)

   selected = _.find(items, (item) => item.category === 'Armor')
   wrapper = shallow(<ItemModal selected={selected} />)
   expect(wrapper.find('h5').text()).toEqual('Armor')
   expect(wrapper.find('button')).toHaveLength(1)
})