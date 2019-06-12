import React from 'react'
import { shallow } from 'enzyme'
import { apiData } from '../utils'

import CreatorFormPage3 from '../../components/CreatorFormPage3'
import { apiObjectToArray } from '../../utils/utils'


const handleChange = jest.fn()
const handleSelect = jest.fn()
const setFieldValue = jest.fn()
const setFieldError = jest.fn()

let api, wrapper, props

beforeAll(async () => {
   api = await apiData()
   const feats = apiObjectToArray(api.feats).filter((feat) => feat.types.includes('Divine') && !feat.prerequisites)
   props = {
      feats,
      handleChange,
      handleSelect, 
      setFieldValue,
      setFieldError
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormPage3 {...props} />)
})

test('should render CreatorFormPage3', () => {
	expect(wrapper).toMatchSnapshot()
})

