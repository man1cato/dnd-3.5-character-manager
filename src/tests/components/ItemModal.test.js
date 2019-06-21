import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import ItemModal from '../../components/ItemModal'
import { apiData } from '../utils/utils'


let items, selected, wrapper

beforeAll(async () => {
   const api = await apiData()
   items = api.items      
   wrapper = shallow(<ItemModal selected={items[0]} />)
})


test('should render ItemModal', () => {
   expect(wrapper).toMatchSnapshot()
})