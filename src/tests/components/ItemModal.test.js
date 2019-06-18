import React from 'react'
import {shallow} from 'enzyme'

import ItemModal from '../../components/ItemModal'
import { apiData } from '../utils'


let props

beforeAll(async () => {
   const api = await apiData()
   const items = api.items
   props = {
      selected: Object.values(items)[0]
   }
})


test('should render ItemModal', () => {
   const wrapper = shallow(<ItemModal {...props} />)
   expect(wrapper).toMatchSnapshot()
})