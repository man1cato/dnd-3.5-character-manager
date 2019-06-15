import React from 'react'
import { shallow } from 'enzyme'
import { apiData } from '../utils'

import CreatorFormPage4 from '../../components/CreatorFormPage4'
import { apiObjectToArray } from '../../utils/utils'


let api, wrapper, props

beforeAll(async () => {
   api = await apiData()
   const feats = apiObjectToArray(api.feats).filter((feat) => feat.types.includes('Divine') && !feat.prerequisites)
   props = {
      feats
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormPage4 {...props} />)
})

test('should render CreatorFormPage4', () => {
	expect(wrapper).toMatchSnapshot()
})

