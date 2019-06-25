import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import CreatorFormJobClass from '../../components/CreatorFormJobClass'
import { apiData } from '../utils/utils'
import { characterOne } from '../utils/seedDatabase'


let wrapper, props

beforeAll(async () => {
   const api = await apiData()
   
   props = {
      values: { 
         race: characterOne.race,
         jobClass: characterOne.jobClass 
      },
      races: api.races,
      jobClasses: api.jobClasses
   }
})

beforeEach(() => {
   wrapper = shallow(<CreatorFormJobClass {...props} />)
})

test('should render CreatorFormJobClass', () => {
	expect(wrapper).toMatchSnapshot()
})

