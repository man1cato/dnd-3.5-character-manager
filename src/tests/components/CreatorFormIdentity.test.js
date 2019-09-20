import React from 'react'
import { shallow } from 'enzyme'
import { apiData } from '../utils/utils'

import CreatorFormIdentity from '../../components/CreatorForm/CreatorFormIdentity'
import { characterOne } from '../utils/seedDatabase'


let wrapper, props

beforeAll(async () => {
   const api = await apiData()
   props = {
      selectedRace: api.races[characterOne.race],
      setSelectedRace: jest.fn(),
      races: api.races,
      jobClasses: api.jobClasses,
      handleChange: jest.fn()
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormIdentity {...props} />)
})

test('should render CreatorFormIdentity correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

