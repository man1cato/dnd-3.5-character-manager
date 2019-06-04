import React from 'react'
import { shallow } from 'enzyme'
import fs from 'fs'

import CreatorFormPage1 from '../../components/CreatorFormPage1'
import { apiObjectToArray } from '../../utils/utils'


const handleChange = jest.fn()
const handleSelect = jest.fn()
const setFieldValue = jest.fn()
let api, wrapper, props

beforeAll(async () => {
   api = await fs.promises.readFile('src/tests/fixtures/api.json')
	api = JSON.parse(api)
   const races = apiObjectToArray(api.races)
   const jobClasses = apiObjectToArray(api.jobClasses).map(jobClass => ({
      id: jobClass.id,
      name: jobClass.name
   }))
   props = {
      races: races.map(race => ({
         id: race.id,
         name: race.name
      })),
      jobClasses,
      selectedRace: races[0],
      handleChange,
      handleSelect, 
      setFieldValue
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormPage1 {...props} />)
})

test('should render CreatorFormPage1', () => {
	expect(wrapper).toMatchSnapshot()
})

