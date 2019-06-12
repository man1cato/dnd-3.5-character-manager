import React from 'react'
import { shallow } from 'enzyme'
import { apiData } from '../utils'

import CreatorFormPage1 from '../../components/CreatorFormPage1'
import { apiObjectToArray } from '../../utils/utils'


let api, wrapper, props

beforeAll(async () => {
   api = await apiData()
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
      selectedRace: races[0]
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormPage1 {...props} />)
})

test('should render CreatorFormPage1 correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

