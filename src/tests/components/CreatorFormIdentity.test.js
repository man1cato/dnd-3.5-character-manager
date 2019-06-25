import React from 'react'
import { shallow } from 'enzyme'
import { apiData } from '../utils/utils'

import CreatorFormIdentity from '../../components/CreatorFormIdentity'
import { characterOne } from '../utils/seedDatabase'


let wrapper, props

beforeAll(async () => {
   const api = await apiData()
   props = {
      values: { race: characterOne.race },
      races: api.races,
      jobClasses: api.jobClasses
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormIdentity {...props} />)
})

test('should render CreatorFormIdentity correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

