import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import { apiData } from '../utils/utils'
import CreatorFormPage5 from '../../components/CreatorFormPage5'


let api, wrapper, props

beforeAll(async () => {
   api = await apiData()
   props = {
      items: api.items,
      values: { equipment: [] }
   }
   wrapper = shallow(<CreatorFormPage5 {...props} />)
})


test('should correctly render CreatorFormPage5', () => {
	expect(wrapper).toMatchSnapshot()
})