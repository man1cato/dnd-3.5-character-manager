import React from 'react'
import { shallow } from 'enzyme'
import fs from 'fs'

import CreatorFormPage2 from '../../components/CreatorFormPage2'
import { apiObjectToArray } from '../../utils/utils'


const handleChange = jest.fn()
const handleSelect = jest.fn()
const setFieldValue = jest.fn()
const setFieldError = jest.fn()

let api, wrapper, props

beforeAll(async () => {
   api = await fs.promises.readFile('src/tests/fixtures/api.json')
	api = JSON.parse(api)
   const races = apiObjectToArray(api.races)
   const jobClasses = apiObjectToArray(api.jobClasses)
   props = {
      jobClasses,
      selectedRace: races[0],
      selectedJobClass: jobClasses[0],
      handleChange,
      handleSelect, 
      setFieldValue,
      setFieldError
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormPage2 {...props} />)
})

test('should render CreatorFormPage2', () => {
	expect(wrapper).toMatchSnapshot()
})

