import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import CreatorFormJobClass from './CreatorFormJobClass'
import { apiData } from '../../tests/utils/utils'
import { characterOne } from '../../tests/utils/seedDatabase'


let wrapper, props

beforeAll(async () => {
   const api = await apiData()
   
   props = {
      values: { school: characterOne.school },
      selectedRace: api.races[characterOne.race],
      selectedJobClass: api.jobClasses[characterOne.jobClass],
      setSelectedJobClass: jest.fn(),
      jobClasses: api.jobClasses
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormJobClass {...props} />)
})

test('should render CreatorFormJobClass', () => {
	expect(wrapper).toMatchSnapshot()
})

