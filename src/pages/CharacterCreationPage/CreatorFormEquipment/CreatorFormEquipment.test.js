import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import { apiData } from '../../../tests/utils/utils'
import CreatorFormEquipment from './CreatorFormEquipment'


let api, wrapper, props

beforeAll(async () => {
   api = await apiData()
   props = {
      items: api.items,
      values: { equipment: [] }
   }
   wrapper = shallow(<CreatorFormEquipment {...props} />)
})


test('should correctly render CreatorFormEquipment', () => {
	expect(wrapper).toMatchSnapshot()
})