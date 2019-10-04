import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import ItemModal from './ItemModal'
import { apiData } from '../../tests/utils/utils'


let items, wrapper

beforeAll(async () => {
   const api = await apiData()
   items = api.items      
   wrapper = shallow(<ItemModal clickedItem={items[0]} />)
})


test('should render ItemModal', () => {
   expect(wrapper).toMatchSnapshot()
})